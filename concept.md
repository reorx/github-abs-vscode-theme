# Syntax Highlighting Philosophy

## The Fundamental Principle

If everything is highlighted, nothing is highlighted.

Syntax highlighting is a tool for quick navigation and orientation in code. Like any tool, it must be used deliberately. When every element has a unique bright color, they all blend together and nothing stands out. The eye adapts to the chaos and loses the ability to distinguish what matters.

## What to Highlight

Highlight what appears sparingly and serves as reference points:

- **Constants and literals** — Numbers, strings. Often where logic paths begin.
- **Declarations, not usage** — Variable declarations, not variable references. Function definitions, not function calls.
- **Top-level definitions** — Reveal code structure at a glance.
- **Comments prominently** — Good comments add crucial context that code cannot express. Make them stand out, don't hide them.

Your code is roughly 75% variable names and function calls. Highlighting them defeats the purpose.

## What NOT to Highlight

- **Language keywords** — `function`, `if`, `else`, `class`, `try`, `catch`. You don't search for the keyword; you search for what comes after it.
- **Variable references** — They're everywhere. Leave them in base text color.
- **Function calls** — Same reason.

## Additional Principles

- **Dim punctuation slightly** — Helps names stand out. Punctuation is rarely the distinguishing element.
- **Base text color dominates** — Most of your code should remain unhighlighted. This is correct.
- **Two types of comments** — Explanations (bright, important) vs disabled code (grey, ignorable). Distinguish when possible.
- **Respect nesting hierarchy** — Function declarations brighter than variable declarations.
- **For light themes, use background colors** — Solves the dark-color-on-light-background problem. Provides vibrancy and contrast simultaneously.
- **Avoid bold and italics** — Just another way to highlight. You don't need more ways.
- **Abandon scientific uniformity** — Colors with identical lightness and chroma look similar. Our eyes are more sensitive to lightness differences—use this, don't negate it.

## The Four-Color Rule

Use exactly four colors that you can remember:

1. **Green** — Strings and numeric constants
2. **Blue** — Variable and parameter declarations
3. **Yellow** — Top-level and function declarations (brightest, respecting hierarchy)
4. **Purple/Bright** — Comments (important documentation, not grey noise)

If you can't type your color scheme from memory, it's not functional. The purpose is to enable two operations:
- See a color, know what it is (direct lookup)
- Look for something, know which color to find (reverse lookup)

## The Test

Can you name your color scheme's colors from memory?
Can you spot when a keyword is misspelled and its color changes?

If not, your theme is ornamental, not functional.
