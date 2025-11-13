const getTheme = require("./theme");
const { getColors } = require("./colors");

// GitHub ABS (Alabaster-Based Syntax) Theme
// Implements the syntax highlighting philosophy from concept.md:
// - Only 4 colors: Green (strings/constants), Blue (declarations), Yellow (functions), Purple (comments)
// - NO highlighting for keywords, variable references, or function calls
// - Most code (~75%) stays in base text color
// - Comments are bright, not grey

function getAbsTheme({ theme, name }) {
  // Get base theme colors for our token color palette
  const isLight = theme === "light_abs";
  const baseThemeName = isLight ? "light" : "dark";

  // Get the base GitHub theme (inherits all UI colors)
  const baseTheme = getTheme({
    theme: baseThemeName,
    name: name
  });

  // Get color scales for our token colors
  const rawColors = getColors(baseThemeName);
  const scale = rawColors.scale;

  // tune foreground
  baseTheme.colors['editor.foreground'] = isLight ? baseTheme.colors['editor.foreground'] : '#e1e1e1';

  // Four-color palette following concept.md
  const absColors = {
    // Purple - Comments (bright, not grey!)
    comment: isLight ? scale.purple[5] : scale.purple[2],
    // Green - Strings and numeric constants
    stringConstant: isLight ? scale.green[5] : scale.green[2],
    // Yellow - Top-level and function declarations (brightest, respecting hierarchy)
    functionDeclaration: isLight ? scale.yellow[4] : scale.yellow[2],
    // Blue - Variable and parameter declarations
    declaration: isLight ? scale.blue[5] : scale.blue[3],
    // Punctuation - Dimmed
    punctuation: isLight ? scale.gray[4] : scale.gray[3],
    // Base text color - for everything else
    base: rawColors.fg.default,
    htmlTag: isLight ? scale.blue[4] : scale.blue[1],
    logicOp: isLight ? scale.coral[5] : scale.coral[1],
    // Error colors - keep red for errors
    error: isLight ? scale.red[5] : scale.red[2],
    // Diff colors
    diffAdded: isLight ? scale.green[6] : scale.green[1],
    diffDeleted: isLight ? scale.red[7] : scale.red[2],
    diffChanged: isLight ? scale.orange[6] : scale.orange[2],
    diffAddedBg: isLight ? scale.green[0] : scale.green[9],
    diffDeletedBg: isLight ? scale.red[0] : scale.red[9],
    diffChangedBg: isLight ? scale.orange[1] : scale.orange[8],
  };

  // NOTE only for semantic tokens (very limited)
  // ref: https://code.visualstudio.com/api/language-extensions/semantic-highlight-guide#semantic-token-provider
  const semanticRules = [
    // FUNCTION/CLASS DECLARATIONS - Yellow (brightest, top-level)
    {
      semanticScopes: [
        // "*.declaration",
        "function.declaration",
        "class.declaration",
        "type.declaration",
        "interface.declaration",
      ],
      settings: {
        foreground: absColors.functionDeclaration,
      },
    },

    // VARIABLE/PARAMETER DECLARATIONS - Blue
    {
      semanticScopes: [
        'parameter.declaration',
      ],
      settings: {
        foreground: absColors.declaration,
      }
    },
  ]
  const semanticTokenColors = {};

  semanticRules.forEach(rule => {
    rule.semanticScopes.forEach(scope => {
      semanticTokenColors[scope] = rule.settings;
    });
  });

  baseTheme.semanticTokenColors = semanticTokenColors;

  // Override ONLY the tokenColors with concept.md principles
  baseTheme.tokenColors = [
    // FUNCTION/CLASS DECLARATIONS - Yellow (brightest, top-level)
    {
      scope: [
        // tsx:
        // { ... }
        'punctuation.section.embedded.begin.tsx',
        'punctuation.section.embedded.end.tsx',
      ],
      settings: {
        foreground: absColors.functionDeclaration,
      },
    },

    // html tag - light blue or cyan
    {
      scope: [
        'entity.name.tag.tsx',
      ],
      settings: {
        foreground: absColors.htmlTag,
      },
    },

    // logic operator - coral
    {
      scope: [
        // &&, ||
        'keyword.operator.logical.tsx',
        // `return`
        'keyword.control.flow.tsx',
      ],
      settings: {
        foreground: absColors.logicOp,
      },
    },

    // base color rewrite
    {
      scope: [
        // variable in template literal
        'meta.embedded.line.js',
        'meta.embedded.line.tsx',
      ],
      settings: {
        foreground: absColors.base,
      },
    },

    // COMMENTS - Purple (bright, not grey! Comments are important documentation)
    {
      scope: ["comment", "punctuation.definition.comment", "string.comment"],
      settings: {
        foreground: absColors.comment
      },
    },

    // STRINGS - Green
    {
      scope: [
        "string",
      ],
      settings: {
        foreground: absColors.stringConstant
      },
    },

    // CONSTANTS (numbers, booleans, null, etc.) - Green
    {
      scope: [
        "constant.numeric",
        "constant.language.boolean",
        "constant.language.null",
        "constant.language.undefined",
      ],
      settings: {
        foreground: absColors.stringConstant
      },
    },

    // FUNCTION/CLASS DECLARATIONS - Yellow (brightest, top-level)
    /*
    {
      scope: [
      ],
      settings: {
        foreground: absColors.functionDeclaration
      }
    },
    */

    // VARIABLE/PARAMETER DECLARATIONS - Blue
    {
      scope: [
        //"variable.parameter",
        "meta.definition.variable",
        "variable.object.property",
        "variable.other.constant.property",
        // tsx:
      ],
      settings: {
        foreground: absColors.declaration
      },
    },

    // PUNCTUATION - Dimmed (helps names stand out)
    {
      scope: [
        "punctuation",
        "meta.brace",
        "meta.delimiter",
        // tsx:
        // attributes value like class names should be dimmed
        //'string.quoted.double.tsx',
        //'string.quoted.single.tsx',
        // attribute name
        'entity.other.attribute-name.tsx',
      ],
      settings: {
        foreground: absColors.punctuation
      },
    },


    // SPECIAL CASES

    // Regex - Green (like strings)
    {
      scope: ["source.regexp", "string.regexp"],
      settings: {
        foreground: absColors.stringConstant
      },
    },

    // Markdown headings - Yellow (like function declarations)
    {
      scope: ["markup.heading", "markup.heading entity.name"],
      settings: {
        fontStyle: "bold",
        foreground: absColors.functionDeclaration
      },
    },

    // Markdown quotes - Green (like strings)
    {
      scope: "markup.quote",
      settings: {
        foreground: absColors.stringConstant
      },
    },

    // Markdown inline code - Green
    {
      scope: "markup.inline.raw",
      settings: {
        foreground: absColors.stringConstant
      },
    },

    // Markdown emphasis - Base color, styled
    {
      scope: "markup.italic",
      settings: {
        fontStyle: "italic",
        foreground: absColors.base,
      },
    },
    {
      scope: "markup.bold",
      settings: {
        fontStyle: "bold",
        foreground: absColors.base,
      },
    },
    {
      scope: ["markup.underline"],
      settings: {
        fontStyle: "underline",
      },
    },
    {
      scope: ["markup.strikethrough"],
      settings: {
        fontStyle: "strikethrough",
      },
    },

    // Diff - Special colors for diff files
    {
      scope: [
        "markup.deleted",
        "meta.diff.header.from-file",
        "punctuation.definition.deleted",
      ],
      settings: {
        background: absColors.diffDeletedBg,
        foreground: absColors.diffDeleted
      },
    },
    {
      scope: [
        "markup.inserted",
        "meta.diff.header.to-file",
        "punctuation.definition.inserted",
      ],
      settings: {
        background: absColors.diffAddedBg,
        foreground: absColors.diffAdded
      },
    },
    {
      scope: ["markup.changed", "punctuation.definition.changed"],
      settings: {
        background: absColors.diffChangedBg,
        foreground: absColors.diffChanged
      },
    },

    // Invalid/Error - Keep red for errors
    {
      scope: ["invalid.broken", "invalid.deprecated", "invalid.illegal", "invalid.unimplemented"],
      settings: {
        fontStyle: "italic",
        foreground: absColors.error
      },
    },
    {
      scope: "message.error",
      settings: {
        foreground: absColors.error
      },
    },
  ];

  return baseTheme;
}

module.exports = getAbsTheme;
