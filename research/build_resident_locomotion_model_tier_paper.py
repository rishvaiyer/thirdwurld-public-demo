from pathlib import Path
import re
import unicodedata
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import BaseDocTemplate, Frame, HRFlowable, KeepTogether, ListFlowable, ListItem, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "thirdwurld-resident-locomotion-model-tier-protocol.md"
OUTPUT = ROOT / "thirdwurld-resident-locomotion-model-tier-research.pdf"

INK = colors.HexColor("#202124")
MUTED = colors.HexColor("#5D626B")
RULE = colors.HexColor("#C7CDD3")
SAGE = colors.HexColor("#385D50")
PALE = colors.HexColor("#F3F4F2")


def safe(value):
    replacements = {"\u2018": "'", "\u2019": "'", "\u201c": '"', "\u201d": '"', "\u2026": "...", "\u00d7": "x", "\u2265": ">=", "\u2264": "<="}
    for old, new in replacements.items():
        value = value.replace(old, new)
    return unicodedata.normalize("NFKC", value)


def inline(value):
    value = safe(value)
    stash = []

    def hold(markup):
        token = f"TOKEN{len(stash)}PLACEHOLDER"
        stash.append(markup)
        return token

    value = re.sub(r"\[([^]]+)\]\((https?://[^)]+)\)", lambda m: hold(f'<link href="{escape(m.group(2))}" color="#385D50"><u>{escape(m.group(1))}</u></link>'), value)
    value = re.sub(r"\*\*([^*]+)\*\*", lambda m: hold(f"<b>{escape(m.group(1))}</b>"), value)
    value = re.sub(r"`([^`]+)`", lambda m: hold(f'<font name="Courier">{escape(m.group(1))}</font>'), value)
    value = escape(value)
    for index, markup in enumerate(stash):
        value = value.replace(f"TOKEN{index}PLACEHOLDER", markup)
    return value


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name="PaperTitle", parent=styles["Title"], fontName="Times-Bold", fontSize=24, leading=29, textColor=INK, alignment=TA_LEFT, spaceAfter=12))
styles.add(ParagraphStyle(name="Subtitle", parent=styles["Normal"], fontName="Times-Roman", fontSize=12, leading=16, textColor=MUTED, spaceAfter=16))
styles.add(ParagraphStyle(name="Meta", parent=styles["Normal"], fontName="Times-Roman", fontSize=9.2, leading=14, textColor=INK, spaceAfter=6))
styles.add(ParagraphStyle(name="H1", parent=styles["Heading1"], fontName="Times-Bold", fontSize=16, leading=20, textColor=INK, spaceBefore=16, spaceAfter=8))
styles.add(ParagraphStyle(name="H2", parent=styles["Heading2"], fontName="Times-Bold", fontSize=11.5, leading=15, textColor=INK, spaceBefore=12, spaceAfter=6))
styles.add(ParagraphStyle(name="Body", parent=styles["BodyText"], fontName="Times-Roman", fontSize=10.5, leading=15.2, textColor=INK, spaceAfter=8))
styles.add(ParagraphStyle(name="PaperBullet", parent=styles["Body"], leftIndent=16, firstLineIndent=-12, spaceAfter=7))
styles.add(ParagraphStyle(name="Table", parent=styles["BodyText"], fontName="Helvetica", fontSize=7.8, leading=10.2, textColor=INK))
styles.add(ParagraphStyle(name="TableHead", parent=styles["BodyText"], fontName="Helvetica-Bold", fontSize=7.8, leading=10.2, textColor=colors.white))


def paragraph(value, style="Body"):
    return Paragraph(inline(value), styles[style])


def table_from(lines):
    rows = []
    for line in lines:
        cells = [cell.strip() for cell in line.strip("|").split("|")]
        if all(re.fullmatch(r"[-: ]+", cell or " ") for cell in cells):
            continue
        rows.append(cells)
    content = []
    for row_index, row in enumerate(rows):
        style = "TableHead" if row_index == 0 else "Table"
        content.append([paragraph(cell, style) for cell in row])
    widths = [7.0 * inch / len(content[0])] * len(content[0])
    result = Table(content, colWidths=widths, repeatRows=1, hAlign="LEFT")
    result.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), SAGE),
        ("GRID", (0, 0), (-1, -1), 0.35, RULE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, PALE]),
    ]))
    return KeepTogether([result, Spacer(1, 8)])


def build_story():
    story = []
    lines = SOURCE.read_text(encoding="utf-8").splitlines()
    index = 0
    pending = []

    def flush():
        if pending:
            story.append(paragraph(" ".join(item.strip() for item in pending)))
            pending.clear()

    while index < len(lines):
        line = safe(lines[index].rstrip())
        if not line:
            flush()
            index += 1
            continue
        if line == "---":
            flush()
            story.append(HRFlowable(width="100%", thickness=0.7, color=RULE, spaceBefore=6, spaceAfter=11))
            index += 1
            continue
        if line.startswith("# "):
            flush()
            story.append(paragraph(line[2:], "PaperTitle"))
            index += 1
            continue
        if line.startswith("## "):
            flush()
            story.append(paragraph(line[3:], "H1"))
            index += 1
            continue
        if line.startswith("### "):
            flush()
            story.append(paragraph(line[4:], "H2"))
            index += 1
            continue
        if line.startswith("**Author:**") or line.startswith("**Document type:**") or line.startswith("**Status:**"):
            flush()
            story.append(paragraph(line, "Meta"))
            index += 1
            continue
        if line.startswith("|") and index + 1 < len(lines) and lines[index + 1].startswith("|"):
            flush()
            block = []
            while index < len(lines) and lines[index].startswith("|"):
                block.append(lines[index])
                index += 1
            story.append(table_from(block))
            continue
        if line.startswith("    "):
            flush()
            story.append(Paragraph(f'<font name="Courier">{escape(line.strip())}</font>', styles["Body"]))
            index += 1
            continue
        if re.match(r"^[-*] ", line):
            flush()
            while index < len(lines) and re.match(r"^[-*] ", lines[index]):
                story.append(Paragraph(f"&bull; &nbsp;{inline(lines[index][2:])}", styles["PaperBullet"]))
                index += 1
            story.append(Spacer(1, 4))
            continue
        if re.match(r"^\d+\. ", line):
            flush()
            items = []
            while index < len(lines) and re.match(r"^\d+\. ", lines[index]):
                items.append(ListItem(paragraph(re.sub(r"^\d+\. ", "", lines[index])), leftIndent=10))
                index += 1
            story.append(ListFlowable(items, bulletType="1", leftIndent=20))
            story.append(Spacer(1, 4))
            continue
        pending.append(line)
        index += 1
    flush()
    return story


def footer(canvas, doc):
    canvas.saveState()
    width, _ = LETTER
    canvas.setStrokeColor(RULE)
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, 0.56 * inch, width - doc.rightMargin, 0.56 * inch)
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 0.34 * inch, "THIRDWURLD / DESIGN-RESEARCH PROTOCOL")
    canvas.drawRightString(width - doc.rightMargin, 0.34 * inch, str(doc.page))
    canvas.restoreState()


def main():
    document = BaseDocTemplate(str(OUTPUT), pagesize=LETTER, leftMargin=0.72 * inch, rightMargin=0.72 * inch, topMargin=0.72 * inch, bottomMargin=0.8 * inch, title="When Do AI Residents Walk?", author="Rishva Iyer")
    frame = Frame(document.leftMargin, document.bottomMargin, document.width, document.height, id="paper")
    document.addPageTemplates([PageTemplate(id="paper", frames=[frame], onPage=footer)])
    document.build(build_story())
    print(OUTPUT)


if __name__ == "__main__":
    main()
