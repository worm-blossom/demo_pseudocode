import {
  A,
  Access,
  AccessStruct,
  AccessTuple,
  And,
  Application,
  ApplicationRaw,
  ArrayLiteral,
  ArrayRepeated,
  ArrayType,
  Assign,
  AssignRaw,
  B,
  BlankPattern,
  Break,
  ChoiceType,
  Code,
  CommentLine,
  Config,
  ConfigPseudocode,
  Context,
  Counter,
  Deemph,
  Def,
  DefField,
  DefFunction,
  DefInterface,
  DefType,
  DefTypeArg,
  DefValue,
  DefVariant,
  Delimited,
  Delimiters,
  Deref,
  Else,
  ElseIf,
  Em,
  Enum,
  EnumLiteral,
  EnumLiteralRaw,
  EscapeHtml,
  Expression,
  Expressions,
  For,
  ForRaw,
  FunctionItem,
  FunctionItemUntyped,
  FunctionLiteral,
  FunctionLiteralUntyped,
  FunctionType,
  FunctionTypeNamed,
  Gt,
  Gte,
  H,
  Hsection,
  If,
  Impl,
  Indent,
  Index,
  InlineComment,
  Interface,
  IsVariant,
  Keyword,
  Land,
  Let,
  LetItem,
  LetRaw,
  Li,
  Loc,
  Loop,
  Lt,
  Lte,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  Match,
  MM,
  Mut,
  Ol,
  P,
  Parens,
  PointerType,
  Pre,
  PreviewScope,
  Pseudocode,
  QualifiedMember,
  R,
  RangeLiteral,
  Rb,
  Rc,
  Rcb,
  Record,
  Reference,
  RefLoc,
  RenderFreshValue,
  Return,
  Rs,
  Rsb,
  Self,
  Sidenote,
  Sidenotes,
  Slice,
  SliceType,
  Span,
  SpliceLoc,
  Strong,
  Struct,
  StructDef,
  Tuple,
  TupleStruct,
  TupleStructDef,
  TupleType,
  Type,
  TypeAnnotation,
  TypeApplication,
  TypeApplicationRaw,
  Ul,
  WaitForMarginales,
  While,
} from "../deps.ts";
import { ArticleTemplate } from "./articleTemplate.tsx";

const ctx = new Context();

// The full input to Macromania is a single expression, which we then evaluate.
const exp = (
  <ArticleTemplate
    title="Pseudocode for Macromania"
    titleId="title"
    abstract={
      <>
        <P>
          Documentation for three Macromania packages for writing pseudocode.
          The <Code>macromania_pseudocode</Code>{" "}
          package provides low-level functionality such as rendering line
          numbers, indentatin, and comments. The <Code>macromania_rustic</Code>
          {" "}
          provides an opinionated, high-level interface for rendering a
          Rust-like pseudo-language.
        </P>
      </>
    }
    authors={[
      {
        name: "Aljoscha Meyer",
        affiliation: "TU Berlin",
        email: "mail@aljoscha-meyer.de",
      },
    ]}
  >
    <Hsection
      n="lowlevel"
      title="Low-level Macros"
    >
      <P>
        The <Code>macromania_pseudocode</Code>{" "}
        provides low-level facilities for pseudocode rendering. You probably
        will not use it directly unless defining your own language constructs.
        Still, cannot really hurt to learn what is going on under the hood.
      </P>

      <P>
        The stylesheets and javascript files for nicely displaying the basic
        pseudocode are configured with the <Code>ConfigPseudocode</Code>{" "}
        config options:
      </P>

      <P>
        <Pre>
          <EscapeHtml>
            {`<ConfigPseudocode
  cssDeps={[{ dep: ["pseudocode.css"] }]}
  jsDeps={[{
    dep: ["pseudocode.js"],
    scriptProps: { defer: true },
  }]}
/>,`}
          </EscapeHtml>
        </Pre>
      </P>

      <P>
        At its most basic, use the <Code>Pseudocode</Code>{" "}
        macro with a sequence of <Code>Loc</Code> (<B>l</B>ine <B>o</B>f{" "}
        <B>c</B>ode) macros as children. All content in the{" "}
        <Code>Pseudocode</Code> must be wrapped in <Code>Loc</Code>{" "}
        macros for the rendering to work out. The <Code>n</Code>{" "}
        prop must be a unique name that can be sued for references to the code
        (demonstrated later).
      </P>

      <Pseudocode n="basicUsage">
        <Loc>let x = 42;</Loc>
        <Loc>let y = x + 5;</Loc>
      </Pseudocode>

      <P>
        By default, no line numbers are shown. Use the{" "}
        <Code>lineNumbering</Code>{" "}
        to overwrite this default. You can use a configuration option to change
        the default:{" "}
        <Code>
          <EscapeHtml>{`<ConfigPseudocode lineNumbering/>`}</EscapeHtml>
        </Code>
      </P>

      <Pseudocode n="lineNumbering" lineNumbering>
        <Loc>This example;</Loc>
        <Loc>Shows line numbers;</Loc>
      </Pseudocode>

      <P>
        You can also use a configuration option to change whether to render line
        numbers by default:
      </P>

      <Config options={<ConfigPseudocode lineNumbering />}>
        <Pseudocode n="lineNumberingByDefault">
          <Loc>And showing line numbers;</Loc>
          <Loc>Again;</Loc>
        </Pseudocode>
      </Config>

      <P>
        Each new <Code>Pseudocode</Code>{" "}
        starts numbering its lines from one. If you want numbering to carry over
        from one block to the next, use the <Code>noLineNumberReset</Code>{" "}
        prop o the block that should continue without reset.
      </P>

      <Pseudocode n="lineNumberingNoReset" lineNumbering noLineNumberReset>
        <Loc>This example;</Loc>
        <Loc>Continues the line numbering;</Loc>
      </Pseudocode>

      <P>
        The <Code>Loc</Code>{" "}
        macro optionally renders a comment at the end of the line.
      </P>

      <Pseudocode n="lineComments" lineNumbering>
        <Loc comment="Short comment.">
          Short line.
        </Loc>
        <Loc comment="Short comment.">
          This line of code is so verbose that it needs a line break. I wonder
          how the comment will render. Only one way to find out, I suppose. Is
          this long enough yet? I think so.
        </Loc>
        <Loc comment="Bla.">
          This line of code is so verbose that it needs a line break. I wonder
          how the comment will render. Only one way to find out, I suppose. Is
          this long enough yet? I think so.
        </Loc>
        <Loc comment="This comment is so verbose that it needs a line break. I wonder how the line of code will render. Only one way to find out, I suppose. Is this long enough yet? I think so.">
          Short line.
        </Loc>
        <Loc comment="This comment is so verbose that it needs a line break. I wonder how the line of code will render. Only one way to find out, I suppose. Is this long enough yet? I think so.">
          This line of code is so verbose that it needs a line break. I wonder
          how the comment will render. Only one way to find out, I suppose. Is
          this long enough yet? I think so.
        </Loc>
        <Loc comment="Comment in a line that contains no actual code."></Loc>
        <CommentLine>
          And a full-line comment using the dedicated macro.
        </CommentLine>
        <Loc>
          finally(a, long, line) of code_that_will_wrap() && should(take, up,
          the) + full.line_width + when(there_is, no, comment);
        </Loc>
      </Pseudocode>

      <P>
        The <Code>InlineComment</Code> renders a comment inside a line of code.
      </P>

      <Pseudocode n="inlineComment" lineNumbering>
        <Loc>
          foo(bar <InlineComment>Yay!</InlineComment>, baz{" "}
          <InlineComment>Nay!</InlineComment>)
        </Loc>
      </Pseudocode>

      <P>
        The <Code>Indent</Code>{" "}
        macro provides indentation to the lines of code it contains.
      </P>

      <Pseudocode n="indentation" lineNumbering>
        <Loc>bla</Loc>
        <Loc>bla</Loc>
        <Indent>
          <Loc>bla</Loc>
          <Loc>bla</Loc>
          <Indent>
            <Loc>bla</Loc>
            <Loc>bla</Loc>
          </Indent>
          <Loc>bla</Loc>
          <Indent>
            <Loc>bla</Loc>
            <Loc>bla</Loc>
          </Indent>
        </Indent>
        <Loc>bla</Loc>
        <Loc>bla</Loc>
      </Pseudocode>

      <P>
        Finally, you can split up a line of code into several more with the{" "}
        <Code>SpliceLoc</Code>{" "}
        macro. This is useful for inserting, for example, multi-line expressions
        into a macro for a statement.
      </P>

      <Pseudocode n="spliceLoc" lineNumbering>
        <Loc>
          let x = foo(<SpliceLoc>
            <Indent>
              <Loc>9876543210123456789,</Loc>
              <Loc>1234567890987654321,</Loc>
            </Indent>
          </SpliceLoc>);
        </Loc>
      </Pseudocode>

      <P>
        Use the <Code>Delimiters</Code> macro for matching pairs of delimiters.
      </P>

      <Pseudocode n="delimiters" lineNumbering>
        <Loc>
          <Delimiters delims={["(", ")"]}>
            <Delimiters delims={["(", ")"]}>
              <Delimiters delims={["(", ")"]}>
                <Delimiters delims={["(", ")"]}></Delimiters>
              </Delimiters>
              <Delimiters delims={["(", ")"]}>
                <Delimiters delims={["(", ")"]}></Delimiters>
              </Delimiters>
              <Delimiters delims={["(", ")"]}></Delimiters>
            </Delimiters>
          </Delimiters>
        </Loc>
      </Pseudocode>

      <P>
        The <Code>Delimited</Code>{" "}
        macro is the bread-and-butter macro for structured code blocks. It wraps
        some content expressions in delimiters, optionally places separator in
        between them, optionally comments any of them, and optionally places
        each of them in their own, indented lines.
      </P>

      <P>
        Further, the <Code>Delimited</Code>{" "}
        macro allows specifying different rendering styles for the delimiters,
        that can be toggled via config options.
      </P>

      <P>
        The following examples use the same <Code>Delimited</Code>{" "}
        invocation, except for toggling the <Code>multiline</Code>{" "}
        flag and for rendering in the three different pseudocode styles: C-like,
        Python-like, and Ruby-like.
      </P>

      <P>Single line, C-style.</P>

      <Pseudocode n="delimitedSinglelineC" lineNumbering>
        <Loc>
          if true{" "}
          <Delimited
            separator=";"
            c={["{", "}"]}
            pythonSkip
            ruby={["then", "endif"]}
            content={["foo()", {
              commented: { segment: "bar()", comment: "bla" },
            }, {
              commented: {
                segment: "baz()",
                comment: "bli",
                dedicatedLine: true,
              },
            }]}
          />{" "}
          else foo;
        </Loc>
      </Pseudocode>

      <P>Multiple lines, C-style.</P>

      <Pseudocode n="delimitedMultilineC" lineNumbering>
        <Loc>
          if true{" "}
          <Delimited
            multiline
            separator=";"
            c={["{", "}"]}
            pythonSkip
            ruby={["then", "endif"]}
            content={["foo()", {
              commented: { segment: "bar()", comment: "bla" },
            }, {
              commented: {
                segment: "baz()",
                comment: "bli",
                dedicatedLine: true,
              },
            }]}
          />{" "}
          else foo;
        </Loc>
      </Pseudocode>

      <Config options={[<ConfigPseudocode delimiterStyle="python" />]}>
        <P>Single line, Python-style.</P>

        <Pseudocode n="delimitedSinglelinePython" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", {
                commented: { segment: "bar()", comment: "bla" },
              }, {
                commented: {
                  segment: "baz()",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>

        <P>Multiple lines, Python-style.</P>

        <Pseudocode n="delimitedMultilinePython" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              multiline
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", {
                commented: { segment: "bar()", comment: "bla" },
              }, {
                commented: {
                  segment: "baz()",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>
      </Config>

      <Config options={[<ConfigPseudocode delimiterStyle="ruby" />]}>
        <P>Single line, Ruby-style.</P>

        <Pseudocode n="delimitedSinglelineRuby" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", {
                commented: { segment: "bar()", comment: "bla" },
              }, {
                commented: {
                  segment: "baz()",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>

        <P>Multiple lines, Ruby-style.</P>

        <Pseudocode n="delimitedMultilineRuby" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              multiline
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", {
                commented: { segment: "bar()", comment: "bla" },
              }, {
                commented: {
                  segment: "baz()",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>
      </Config>

      <P>
        The <Code>Keyword</Code> macro renders a keyword, the{" "}
        <Code>Deemph</Code> macro deemphasises its contents.
      </P>

      <Pseudocode n="keyword" lineNumbering>
        <Loc>
          <Keyword>return</Keyword>
        </Loc>
        <Loc>
          <Deemph>;</Deemph>
        </Loc>
      </Pseudocode>

      <Hsection n="pseudocodeDefref" title="Referencing Pseudocode">
        <P>
          You can use the DefRef package to reference a code block{" "}
          <R n="lineNumbering">like this</R>. The pseudocode package also
          provides its own <Code>RefLoc</Code>{" "}
          macro for referencing individual lines of code or a sequence of lines:
          {" "}
          <RefLoc n="indentation" lines={2}>line 2</RefLoc>,{" "}
          <RefLoc n="indentation" lines={[3, 5]}>lines 3–5</RefLoc>, and{" "}
          <RefLoc n="indentation" lines={{ many: [2, [4, 5], 7] }}>
            lines 2, 4–5, and 7
          </RefLoc>.
        </P>
      </Hsection>
    </Hsection>
    <Hsection
      n="highlevel"
      title="High-level Macros — Rustic"
    >
      <P>
        The <Code>macromania_rustic</Code>{"  "}
        package provides opinionated high-level facilities for writing
        pseudocode. It not only provides statements and expressions, but also
        type definitions and interfaces (though none of them get typechecked).
        The level of expressivity of the pseudo-type system corresponds roughly
        to that of Rust without lifetimes.
      </P>

      <P>
        All examples we show here are rendered using C-style braces, but
        everything also works for Python-style and Ruby-style syntax.
      </P>

      <P>
        The API is rather extensive, so we split it into four groups:{" "}
        <R n="inlineTypes">type operators</R>,{" "}
        <R n="inlineExpressions">expressions</R>,{" "}
        <R n="rusticStatements">statements</R>, and{" "}
        <R n="rusticItems">items</R>.
      </P>

      <PreviewScope>
        <P>
          Rustic is integrated with DefRef, and creates definitions of several
          kinds: values, functions, types, fields, enum variants, interfaces,
          and type arguments. For each of these, there is a macro to manually
          create these kinds of definitions: <DefValue n="some_value" />,{" "}
          <DefFunction n="some_function" />, <DefType n="SomeType" />,{" "}
          <DefField n="some_field" />, <DefVariant n="SomeVariant" />,{" "}
          <DefInterface n="SomeInterface" />, and{" "}
          <DefTypeArg n="SomeTypeArg" />.
        </P>
      </PreviewScope>

      <P>
        You can reference these definitions anywhere: in body text, in
        pseudocode, and in code comments. <R n="some_value" />,{" "}
        <R n="some_function" />, <R n="SomeType" />, <R n="some_field" />,{" "}
        <R n="SomeVariant" />, <R n="SomeInterface" />, <R n="SomeTypeArg" />.
      </P>

      <Pseudocode n="refs" lineNumbering>
        <CommentLine>
          Lorem ipsum <R n="some_value" />{" "}
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et <R n="some_function" />{" "}
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco <R n="SomeType" />{" "}
          nisi ut aliquip ex ea commodo consequat. Duis aute irure{" "}
          <R n="some_field" /> in reprehenderit in voluptate velit esse cillum
          {" "}
          <R n="SomeVariant" />{" "}
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in <R n="SomeInterface" />{" "}
          qui officia deserunt mollit anim id est <R n="SomeTypeArg" />.
        </CommentLine>
        <Loc>
          <R n="some_value" />, <R n="some_function" />, <R n="SomeType" />,
          {" "}
          <R n="some_field" />, <R n="SomeVariant" />, <R n="SomeInterface" />,
          {" "}
          <R n="SomeTypeArg" />
        </Loc>
      </Pseudocode>

      <Hsection n="inlineTypes" title="Type Operators">
        <P>Tuple types, i.e., anonymous product types:</P>

        <Pseudocode n="tupleTypes" lineNumbering>
          <Loc>
            <TupleType />
          </Loc>
          <Loc>
            <TupleType types={["A"]} />
          </Loc>
          <Loc>
            <TupleType
              types={["A", {
                commented: { segment: "B", comment: "bla" },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <TupleType
              types={["A", {
                commented: { segment: "B", comment: "bla" },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
        </Pseudocode>

        <P>Choice types, i.e., anonymous sum types:</P>

        <Pseudocode n="sumTypes" lineNumbering>
          <Loc>
            <ChoiceType types={["A"]} />
          </Loc>
          <Loc>
            <ChoiceType
              types={["A", {
                commented: { segment: "B", comment: "bla" },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <ChoiceType
              types={["A", {
                commented: { segment: "B", comment: "bla" },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
        </Pseudocode>

        <P>Function types, optionally with argument names:</P>

        <Pseudocode n="functionTypes" lineNumbering>
          <Loc>
            <FunctionType args={[]} ret="Y" />
          </Loc>
          <Loc>
            <FunctionType args={["A"]} ret="Y" />
          </Loc>
          <Loc>
            <FunctionType
              args={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              ret="Y"
            />
          </Loc>
          <Loc>
            <FunctionType
              args={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              ret="Y"
              multiline
            />
          </Loc>
          <Loc>
            <FunctionType
              generics={[{
                id: ["S", "funType10"],
              }, {
                id: ["T", "funType11"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funType12"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funType13"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              args={[<R n="funType10" />]}
              ret={<R n="funType13" />}
            />
          </Loc>
          <Loc>
            <FunctionType
              generics={[{
                id: ["S", "funType20"],
              }, {
                id: ["T", "funType21"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funType22"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funType23"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              multilineGenerics
              args={[<R n="funType20" />]}
              ret={<R n="funType23" />}
            />
          </Loc>
          <CommentLine>
            When defining named arguments, the first value in the array is the
            name to be displayed, the second is a unique identifier to pass to
            DefRef, and the third value is the type of the argument.
          </CommentLine>
          <Loc>
            <FunctionTypeNamed
              args={[["a", "functionTypesa1", "A"]]}
              ret="Y"
            />
          </Loc>
          <Loc>
            <FunctionTypeNamed
              args={[
                ["foo", "functionTypesa2", "A"],
                {
                  commented: {
                    segment: ["bar", "functionTypesb2", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["baz", "functionTypesc2", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              ret="Y"
            />
          </Loc>
          <Loc>
            <FunctionTypeNamed
              args={[
                ["foo", "functionTypesa3", "A"],
                {
                  commented: {
                    segment: ["bar", "functionTypesb3", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["baz", "functionTypesc3", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              ret="Y"
              multiline
            />
          </Loc>
          <Loc>
            <FunctionTypeNamed
              generics={[{
                id: ["S", "funType50"],
              }, {
                id: ["T", "funType51"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funType52"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funType53"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              args={[["s", "functionTypesa4", <R n="funType50" />]]}
              ret={<R n="funType53" />}
            />
          </Loc>
          <Loc>
            <FunctionTypeNamed
              generics={[{
                id: ["S", "funType60"],
              }, {
                id: ["T", "funType61"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funType62"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funType63"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              multilineGenerics
              args={[["s", "functionTypesa5", <R n="funType60" />]]}
              ret={<R n="funType63" />}
            />
          </Loc>
        </Pseudocode>

        <P>
          Array types, i.e., sequences of known length containing values of the
          same type:
        </P>

        <Pseudocode n="arrayTypes" lineNumbering>
          <Loc>
            <ArrayType count="42">A</ArrayType>
          </Loc>
        </Pseudocode>

        <P>
          Pointer types, i.e., references to exactly one value of a certain type
          (no null pointers in pseudo code, your readers deserve a type system
          that makes sense):
        </P>

        <Pseudocode n="pointerTypes" lineNumbering>
          <CommentLine>
            A pointer that can be read from but not written to.
          </CommentLine>
          <Loc>
            <PointerType>A</PointerType>
          </Loc>
          <CommentLine>
            A pointer that can be read from and written to.
          </CommentLine>
          <Loc>
            <PointerType mut>A</PointerType>
          </Loc>
          <CommentLine>
            A pointer that can be written to but not read from.
          </CommentLine>
          <Loc>
            <PointerType mut="writeonly">A</PointerType>
          </Loc>
          <CommentLine>
            A pointer that can neither be read from nor written to.
          </CommentLine>
          <Loc>
            <PointerType mut="opaque">A</PointerType>
          </Loc>
        </Pseudocode>

        <P>
          Slice types, i.e., references to one or more values, consecutively
          stored in memory:
        </P>

        <Pseudocode n="sliceTypes" lineNumbering>
          <CommentLine>
            A slice that can be read from but not written to.
          </CommentLine>
          <Loc>
            <SliceType>A</SliceType>
          </Loc>
          <CommentLine>
            A slice that can be read from and written to.
          </CommentLine>
          <Loc>
            <SliceType mut>A</SliceType>
          </Loc>
          <CommentLine>
            A slice that can be written to but not read from.
          </CommentLine>
          <Loc>
            <SliceType mut="writeonly">A</SliceType>
          </Loc>
          <CommentLine>
            A slice that can neither be read from nor written to.
          </CommentLine>
          <Loc>
            <SliceType mut="opaque">A</SliceType>
          </Loc>
        </Pseudocode>

        <P>
          Type applications, i.e., supplying parameters to a type constructor:
        </P>

        <Pseudocode n="typeApplications" lineNumbering>
          <Loc>
            <TypeApplicationRaw constr="List" args={["Foo"]} />
          </Loc>
          <Loc>
            <TypeApplicationRaw
              constr="List"
              args={["Foo", {
                commented: {
                  segment: "Bar",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "Baz",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <TypeApplicationRaw
              constr="List"
              args={["Foo", {
                commented: {
                  segment: "Bar",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "Baz",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
          <Loc>
            <TypeApplication constr="SomeType" args={["Foo"]} />
          </Loc>
          <Loc>
            <TypeApplication
              constr="SomeType"
              args={["Foo", {
                commented: {
                  segment: "Bar",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "Baz",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <TypeApplication
              constr="SomeType"
              args={["Foo", {
                commented: {
                  segment: "Bar",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "Baz",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
        </Pseudocode>
      </Hsection>

      <Hsection n="inlineExpressions" title="Expressions">
        <P>Parentheses to clarify associativity:</P>

        <Pseudocode n="parens" lineNumbering>
          <Loc>
            <Parens>
              a +{" "}
              <Parens>
                <Parens>b + c</Parens> + d
              </Parens>
            </Parens>
          </Loc>
        </Pseudocode>

        <P>
          Comparison operators, bitwise-and, and logical-and without manually
          escaping html:
        </P>

        <Pseudocode n="comparisonOps" lineNumbering>
          <Loc>
            <Gt /> <Gte /> <Lt /> <Lte /> <And /> <Land />
          </Loc>
        </Pseudocode>

        <P>Type annotations:</P>

        <Pseudocode n="typeAnnotations" lineNumbering>
          <Loc>
            <TypeAnnotation type="Foo">foo</TypeAnnotation>
          </Loc>
        </Pseudocode>

        <P>
          Tuple literals, optionally preceded by a name (emulating Rusts's tuple
          structs):
        </P>

        <Pseudocode n="createTuples" lineNumbering>
          <Loc>
            <Tuple />
          </Loc>
          <Loc>
            <Tuple fields={["a"]} />
          </Loc>
          <Loc>
            <Tuple
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Tuple
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
          <Loc>
            <Tuple name="Foo" />
          </Loc>
          <Loc>
            <Tuple name="Foo" fields={["a"]} />
          </Loc>
          <Loc>
            <Tuple
              name="Foo"
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Tuple
              name="Foo"
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
          <Loc>
            <TupleStruct name="SomeType" />
          </Loc>
          <Loc>
            <TupleStruct name="SomeType" fields={["a"]} />
          </Loc>
          <Loc>
            <TupleStruct
              name="SomeType"
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <TupleStruct
              name="SomeType"
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
        </Pseudocode>

        <P>Tuple access:</P>

        <Pseudocode n="accessTuples" lineNumbering>
          <Loc>
            <Access at="0">foo</Access>
          </Loc>
          <Loc>
            <AccessTuple at={0}>foo</AccessTuple>
          </Loc>
        </Pseudocode>

        <P>Record literals and struct literals:</P>

        <Pseudocode n="recordStructLiterals" lineNumbering>
          <Loc>
            <Record />
          </Loc>
          <Loc>
            <Record fields={[["a", "1"]]} />
          </Loc>
          <Loc>
            <Record
              fields={[["a", "1"], {
                commented: {
                  segment: ["b", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["c", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Record
              fields={[["a", "1"], {
                commented: {
                  segment: ["b", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["c", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
          <Loc>
            <Record name="Foo" />
          </Loc>
          <Loc>
            <Record name="Foo" fields={[["a", "1"]]} />
          </Loc>
          <Loc>
            <Record
              name="Foo"
              fields={[["a", "1"], {
                commented: {
                  segment: ["b", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["c", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Record
              name="Foo"
              fields={[["a", "1"], {
                commented: {
                  segment: ["b", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["c", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>

          <Loc>
            <Struct name="SomeType" />
          </Loc>
          <Loc>
            <Struct name="SomeType" fields={[["some_field", "1"]]} />
          </Loc>
          <Loc>
            <Struct
              name="SomeType"
              fields={[["some_field", "1"], {
                commented: {
                  segment: ["some_field", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["some_field", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Struct
              name="SomeType"
              fields={[["some_field", "1"], {
                commented: {
                  segment: ["some_field", "2"],
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: ["some_field", "3"],
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
        </Pseudocode>

        <P>Record access and struct access:</P>

        <Pseudocode n="accessRecordsStructs" lineNumbering>
          <Loc>
            <Access at="0">foo</Access>
          </Loc>
          <Loc>
            <AccessStruct field="some_field">foo</AccessStruct>
          </Loc>
        </Pseudocode>

        <P>Qualified enum literals:</P>

        <Pseudocode n="enumLiterals" lineNumbering>
          <Loc>
            <EnumLiteralRaw name="Foo">
              <Tuple name="Bar" />
            </EnumLiteralRaw>
          </Loc>
          <Loc>
            <EnumLiteralRaw name="Foo">
              <Tuple
                name="Bar"
                fields={["a", {
                  commented: {
                    segment: "b",
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: "c",
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
              />
            </EnumLiteralRaw>
          </Loc>
          <Loc>
            <EnumLiteralRaw name="Foo">
              <Tuple
                name="Bar"
                fields={["a", {
                  commented: {
                    segment: "b",
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: "c",
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
                multiline
              />
            </EnumLiteralRaw>
          </Loc>
          <Loc>
            <EnumLiteralRaw name="Foo">
              <Record
                name="Bar"
                fields={[["a", "1"], {
                  commented: {
                    segment: ["b", "2"],
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: ["c", "3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
              />
            </EnumLiteralRaw>
          </Loc>
          <Loc>
            <EnumLiteralRaw name="Foo">
              <Record
                name="Bar"
                fields={[["a", "1"], {
                  commented: {
                    segment: ["b", "2"],
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: ["c", "3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
                multiline
              />
            </EnumLiteralRaw>
          </Loc>

          <Loc>
            <EnumLiteral name="SomeType">
              <TupleStruct name="SomeVariant" />
            </EnumLiteral>
          </Loc>
          <Loc>
            <EnumLiteral name="SomeType">
              <TupleStruct
                name="SomeVariant"
                fields={["a", {
                  commented: {
                    segment: "b",
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: "c",
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
              />
            </EnumLiteral>
          </Loc>
          <Loc>
            <EnumLiteral name="SomeType">
              <TupleStruct
                name="SomeVariant"
                fields={["a", {
                  commented: {
                    segment: ["b", "2"],
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: ["c", "3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
                multiline
              />
            </EnumLiteral>
          </Loc>
          <Loc>
            <EnumLiteral name="SomeType">
              <Struct
                name="SomeVariant"
                fields={[["some_field", "1"], {
                  commented: {
                    segment: ["some_field", "2"],
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: ["some_field", "3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
              />
            </EnumLiteral>
          </Loc>
          <Loc>
            <EnumLiteral name="SomeType">
              <Struct
                name="SomeVariant"
                fields={[["some_field", "1"], {
                  commented: {
                    segment: ["some_field", "2"],
                    comment: "bla",
                  },
                }, {
                  commented: {
                    segment: ["some_field", "3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                }]}
                multiline
              />
            </EnumLiteral>
          </Loc>
        </Pseudocode>

        <P>
          Testing whether an expression evaluates to a value of a certain enum
          variant.
        </P>

        <Pseudocode n="isVariant" lineNumbering>
          <Loc>
            <IsVariant variant="Some">x</IsVariant>
          </Loc>
        </Pseudocode>

        <P>
          Anonymous function literals, i.e., function expressions, closures,
          lambda expressions:
        </P>

        <Pseudocode n="functionLiterals" lineNumbering>
          <CommentLine>
            When defining arguments for untyped function literals, the first
            value in the array is the name to be displayed, and the second is a
            unique identifier to pass to DefRef.
          </CommentLine>
          <Loc>
            <FunctionLiteralUntyped
              args={[["a", "functionLiteralUntypeda0"]]}
              body={["return 4"]}
              singleLineBody
            />
          </Loc>
          <Loc>
            <FunctionLiteralUntyped
              args={[["a", "functionLiteralUntypeda1"]]}
              body={["return 4"]}
            />
          </Loc>
          <Loc>
            <FunctionLiteralUntyped
              args={[
                ["a", "functionLiteralUntypeda2"],
                {
                  commented: {
                    segment: ["b", "functionLiteralUntypedb2"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralUntypedc2"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
            />
          </Loc>
          <Loc>
            <FunctionLiteralUntyped
              args={[
                ["a", "functionLiteralUntypeda3"],
                {
                  commented: {
                    segment: ["b", "functionLiteralUntypedb3"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralUntypedc3"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
              multilineArgs
            />
          </Loc>
          <CommentLine>
            When defining arguments for typed function literals, the first value
            in the array is the name to be displayed, the second is a unique
            identifier to pass to DefRef, and the third is the type of the
            argument.
          </CommentLine>
          <Loc>
            <FunctionLiteral
              args={[["a", "functionLiterala0", "A"]]}
              body={["return 4"]}
              singleLineBody
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[["a", "functionLiterala1", "A"]]}
              body={["return 4"]}
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[["a", "functionLiterala01", "A"]]}
              body={["return 4"]}
              singleLineBody
              ret="Number"
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[["a", "functionLiterala11", "A"]]}
              body={["return 4"]}
              ret="Number"
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[
                ["a", "functionLiterala2", "A"],
                {
                  commented: {
                    segment: ["b", "functionLiteralb2", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralc2", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[
                ["a", "functionLiterala3", "A"],
                {
                  commented: {
                    segment: ["b", "functionLiteralb3", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralc3", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
              multilineArgs
            />
          </Loc>

          <Loc>
            <FunctionLiteral
              args={[
                ["a", "functionLiterala21", "A"],
                {
                  commented: {
                    segment: ["b", "functionLiteralb21", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralc21", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
              ret="Number"
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              args={[
                ["a", "functionLiterala31", "A"],
                {
                  commented: {
                    segment: ["b", "functionLiteralb31", "B"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["c", "functionLiteralc31", "C"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
              ]}
              body={["return 4"]}
              multilineArgs
              ret="Number"
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              generics={[{
                id: ["S", "funLit10"],
              }, {
                id: ["T", "funLit11"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funLit12"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funLit13"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              args={[["s", "functionLiterala51", <R n="funLit10" />]]}
              body={["return 4"]}
              singleLineBody
              ret={<R n={"funLit13"} />}
            />
          </Loc>
          <Loc>
            <FunctionLiteral
              generics={[{
                id: ["S", "funLit20"],
              }, {
                id: ["T", "funLit21"],
                bounds: ["Eq"],
              }, {
                id: ["U", "funLit22"],
                bounds: ["Eq", "Ord"],
              }, {
                id: ["V", "funLit23"],
                bounds: ["Eq", "Ord"],
                multiline: true,
              }]}
              multilineGenerics
              args={[["s", "functionLiterala61", <R n="funLit20" />]]}
              body={["return 4"]}
              singleLineBody
              ret={<R n={"funLit23"} />}
            />
          </Loc>
        </Pseudocode>

        <P>
          Function applications:
        </P>

        <Pseudocode n="functionApplications" lineNumbering>
          <Loc>
            <ApplicationRaw fun="foo" />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a"]}
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multilineArgs
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              generics={["A"]}
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a"]}
              generics={["A"]}
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a"]}
              generics={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <ApplicationRaw
              fun="foo"
              args={["a"]}
              generics={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multilineGenerics
            />
          </Loc>
          <Loc>
            <Application fun="some_function" />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a"]}
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multilineArgs
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              generics={["A"]}
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a"]}
              generics={["A"]}
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a"]}
              generics={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <Application
              fun="some_function"
              args={["a"]}
              generics={["A", {
                commented: {
                  segment: "B",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "C",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multilineGenerics
            />
          </Loc>
        </Pseudocode>

        <P>
          Array literals, explicit and via repitition:
        </P>

        <Pseudocode n="arrayLiterals" lineNumbering>
          <Loc>
            <ArrayLiteral />
          </Loc>
          <Loc>
            <ArrayLiteral fields={["a"]} />
          </Loc>
          <Loc>
            <ArrayLiteral
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
            />
          </Loc>
          <Loc>
            <ArrayLiteral
              fields={["a", {
                commented: {
                  segment: "b",
                  comment: "bla",
                },
              }, {
                commented: {
                  segment: "c",
                  comment: "bli",
                  dedicatedLine: true,
                },
              }]}
              multiline
            />
          </Loc>
          <Loc>
            <ArrayRepeated repetitions="42">x</ArrayRepeated>
          </Loc>
        </Pseudocode>

        <P>
          Indexing into arrays:
        </P>

        <Pseudocode n="indexArray" lineNumbering>
          <Loc>
            <Index index="4">foo</Index>
          </Loc>
        </Pseudocode>

        <P>
          Taking references, i.e., creating pointers:
        </P>

        <Pseudocode n="takeReferences" lineNumbering>
          <Loc>
            <Reference>A</Reference>
          </Loc>
          <Loc>
            <Reference mut>A</Reference>
          </Loc>
          <Loc>
            <Reference mut="writeonly">A</Reference>
          </Loc>
          <Loc>
            <Reference mut="opaque">A</Reference>
          </Loc>
        </Pseudocode>

        <P>
          Dereferencing pointers:
        </P>

        <Pseudocode n="dereferencePointer" lineNumbering>
          <Loc>
            <Deref>A</Deref>
          </Loc>
        </Pseudocode>

        <P>
          Range literals:
        </P>

        <Pseudocode n="rangeExpression" lineNumbering>
          <Loc>
            <RangeLiteral />
          </Loc>
          <Loc>
            <RangeLiteral from="4" />
          </Loc>
          <Loc>
            <RangeLiteral to="7" />
          </Loc>
          <Loc>
            <RangeLiteral from="4" to="7" />
          </Loc>
          <Loc>
            <RangeLiteral inclusive />
          </Loc>
          <Loc>
            <RangeLiteral from="4" inclusive />
          </Loc>
          <Loc>
            <RangeLiteral to="7" inclusive />
          </Loc>
          <Loc>
            <RangeLiteral from="4" to="7" inclusive />
          </Loc>
        </Pseudocode>

        <P>
          Taking slices, i.e., creating pointers to zero or more values:
        </P>

        <Pseudocode n="takeSlices" lineNumbering>
          <Loc>
            <Slice>A</Slice>
          </Loc>
          <Loc>
            <Slice from="4">A</Slice>
          </Loc>
          <Loc>
            <Slice to="7">A</Slice>
          </Loc>
          <Loc>
            <Slice from="4" to="7">A</Slice>
          </Loc>
          <Loc>
            <Slice mut>A</Slice>
          </Loc>
          <Loc>
            <Slice mut="writeonly">A</Slice>
          </Loc>
          <Loc>
            <Slice mut="opaque">A</Slice>
          </Loc>
          <Loc comment="Don't do this.">
            <Slice inclusive>A</Slice>
          </Loc>
          <Loc comment="Don't do this.">
            <Slice from="4" inclusive>A</Slice>
          </Loc>
          <Loc>
            <Slice to="7" inclusive>A</Slice>
          </Loc>
          <Loc>
            <Slice from="4" to="7" inclusive>A</Slice>
          </Loc>
        </Pseudocode>

        <P>
          Indexing into slices:
        </P>

        <Pseudocode n="indexSlices" lineNumbering>
          <Loc>
            <Index index="4">foo</Index>
          </Loc>
        </Pseudocode>
      </Hsection>

      <Hsection n="rusticStatements" title="Statements">
        <P>
          Creating variables via <Code>let</Code> statements.
        </P>

        <Pseudocode n="letStatement" lineNumbering>
          <Loc>
            <LetRaw lhs="x">4</LetRaw>
          </Loc>
          <Loc>
            <LetRaw lhs="x" mut>4</LetRaw>
          </Loc>
          <Loc>
            <LetRaw lhs="x" type="Foo">4</LetRaw>
          </Loc>
          <Loc>
            <Let id="foo1">4</Let>
          </Loc>
          <Loc>
            <Let id={["foo", "letStatementFoo0"]}>4</Let>
          </Loc>
          <Loc>
            <Let id={["foo", "letStatementFoo1"]} type="Foo">4</Let>
          </Loc>
          <Loc>
            <Let mut id={["foo", "letStatementFoo2"]}>4</Let>
          </Loc>
          <Loc>
            <LetRaw
              lhs={
                <Tuple
                  fields={[
                    <RenderFreshValue id={["x", "letStatementX0"]} />,
                    <>
                      <Mut /> <RenderFreshValue id={["y", "letStatementY0"]} />
                    </>,
                  ]}
                />
              }
            >
              bla
            </LetRaw>
          </Loc>
        </Pseudocode>

        <P>
          Assign to variables:
        </P>

        <Pseudocode n="assign" lineNumbering>
          <Loc>
            <AssignRaw lhs="x">4</AssignRaw>
          </Loc>
          <Loc>
            <Assign id="foo1">4</Assign>
          </Loc>
          <Loc>
            <AssignRaw
              lhs={
                <Tuple
                  fields={[
                    <R n="letStatementX0" />,
                    <R n="letStatementY0" />,
                  ]}
                />
              }
            >
              bla
            </AssignRaw>
          </Loc>
          <Loc>
            <AssignRaw lhs="x" op="+=">4</AssignRaw>
          </Loc>
          <Loc>
            <Assign id="foo1" op="+=">4</Assign>
          </Loc>
        </Pseudocode>

        <P>
          If statements, else statements, else if statements:
        </P>

        <Pseudocode n="ifElse" lineNumbering>
          <Loc>
            <If cond="x" body={["foo()", "bar()"]} />
          </Loc>
          <Loc>
            <If cond="x" body={["foo()"]} singleline />
          </Loc>
          <Loc>
            <If cond="x" body={["foo()", "bar()"]} />{" "}
            <Else body={["baz()", "qux()"]} />
          </Loc>
          <Loc>
            <If cond="x" body={["foo()"]} singleline />{" "}
            <Else body={["bar()"]} singleline />
          </Loc>
          <Loc>
            <If cond="x" body={["foo()", "bar()"]} />{" "}
            <ElseIf body={["baz()", "qux()"]} />
          </Loc>
          <Loc>
            <If cond="x" body={["foo()"]} singleline />{" "}
            <ElseIf body={["bar()"]} singleline />
          </Loc>
        </Pseudocode>

        <P>
          Match statements:
        </P>

        <Pseudocode n="matchStatements" lineNumbering>
          <Loc>
            <Match
              exp={"x"}
              cases={[
                ["0", "foo()"],
                ["1", ["foo()", "bar()"]],
                {
                  commented: {
                    segment: ["2", "foo()"],
                    comment: "bla",
                  },
                },
                {
                  commented: {
                    segment: ["3", "foo()"],
                    comment: "bli",
                    dedicatedLine: true,
                  },
                },
                {
                  commented: {
                    segment: ["4", ["foo()", "bar()"]],
                    comment: "blu",
                  },
                },
                {
                  commented: {
                    segment: [<BlankPattern />, ["foo()", "bar()"]],
                    comment: "ble",
                    dedicatedLine: true,
                  },
                },
              ]}
            />
          </Loc>
        </Pseudocode>

        <P>
          Return statements, and break statements:
        </P>

        <Pseudocode n="returnBreak" lineNumbering>
          <Loc>
            <Return />
          </Loc>
          <Loc>
            <Return>x</Return>
          </Loc>
          <Loc>
            <Break />
          </Loc>
          <Loc>
            <Break>x</Break>
          </Loc>
        </Pseudocode>

        <P>
          While loops:
        </P>

        <Pseudocode n="whileStatement" lineNumbering>
          <Loc>
            <While cond="x" body={["foo()", "bar()"]} />
          </Loc>
          <Loc>
            <While cond="x" body={["foo()"]} singleline />
          </Loc>
        </Pseudocode>

        <P>
          Infinite loop statements:
        </P>

        <Pseudocode n="loopStatement" lineNumbering>
          <Loc>
            <Loop body={["foo()", "bar()"]} />
          </Loc>
          <Loc>
            <Loop body={["foo()"]} singleline />
          </Loc>
        </Pseudocode>

        <P>
          For loops, i.e., consuming iterators:
        </P>

        <Pseudocode n="forStatement" lineNumbering>
          <Loc>
            <ForRaw
              pattern="x"
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()", "bar()"]}
            />
          </Loc>
          <Loc>
            <ForRaw
              pattern="x"
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()", "bar()"]}
              mut
            />
          </Loc>
          <Loc>
            <ForRaw
              pattern="x"
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()"]}
              singleline
            />
          </Loc>
          <Loc>
            <ForRaw
              pattern="x"
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()"]}
              singleline
              mut
            />
          </Loc>
          <Loc>
            <For
              pattern={["x", "forX1"]}
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()", "bar()"]}
            />
          </Loc>
          <Loc>
            <For
              pattern={["x", "forX2"]}
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()", "bar()"]}
              mut
            />
          </Loc>
          <Loc>
            <For
              pattern={["x", "forX3"]}
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()"]}
              singleline
            />
          </Loc>
          <Loc>
            <For
              pattern={["x", "forX4"]}
              iterator={<RangeLiteral from="4" to="7" />}
              body={["foo()"]}
              singleline
              mut
            />
          </Loc>
        </Pseudocode>
      </Hsection>

      <Hsection n="rusticItems" title="Items">
        <P>
          Type aliases:
        </P>

        <Pseudocode n="typeItem" lineNumbering>
          <Type id={["Foo", "typeItem0"]}>Bar</Type>
          <Type id={["Foo", "typeItem9"]} comment="Doc comment for the type.">
            Bar
          </Type>
          <Type
            id={["Foo", "typeItem1"]}
            generics={[{
              id: ["S", "typeItemArg10"],
            }, {
              id: ["T", "typeItemArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "typeItemArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "typeItemArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
          >
            Bar
          </Type>
          <Type
            id={["Foo", "typeItem2"]}
            generics={[{
              id: ["S", "typeItemArg20"],
            }, {
              id: ["T", "typeItemArg21"],
              bounds: ["Eq"],
            }, {
              id: ["U", "typeItemArg22"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "typeItemArg23"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multiline
          >
            Bar
          </Type>
        </Pseudocode>

        <P>
          Creating global variables, aka static variables.
        </P>

        <Pseudocode n="letItem" lineNumbering>
          <LetItem id={["foo", "letItemFoo0"]}>4</LetItem>
          <LetItem
            comment="Doc comment for the let item."
            id={["foo", "letItemFoo1"]}
          >
            4
          </LetItem>
          <LetItem id={["foo", "letItemFoo2"]} type="Foo">4</LetItem>
          <LetItem mut id={["foo", "letItemFoo3"]}>4</LetItem>
        </Pseudocode>

        <P>
          Creating named functions.
        </P>

        <Pseudocode n="functionItem" lineNumbering>
          <FunctionItemUntyped
            id={["foo", "functionItem1"]}
            args={[["a", "functionItem10"]]}
            body={[<Return>4</Return>]}
          />
          <FunctionItemUntyped
            comment="Untyped function doc comment."
            id={["foo", "functionItem2"]}
            args={[["a", "functionItem20"]]}
            body={[<Return>4</Return>]}
          />
          <FunctionItem
            id={["foo", "functionItem3"]}
            args={[["a", "functionItem30", "A"]]}
            body={[<Return>4</Return>]}
          />
          <FunctionItem
            comment="Typed function doc comment."
            id={["foo", "functionItem4"]}
            args={[["a", "functionItem40", "A"]]}
            body={[<Return>4</Return>]}
          />
        </Pseudocode>

        <P>
          Struct definitions:
        </P>

        <Pseudocode n="structItem" lineNumbering>
          <StructDef
            id={["Foo", "structItem0"]}
            fields={[[["x", "structItem00"], "X"]]}
          />
          <StructDef
            id={["Foo", "structItem1"]}
            fields={[{
              commented: {
                segment: [["x", "structItem10"], "X"],
                comment: "Field doc comment.",
                dedicatedLine: true,
              },
            }, {
              commented: {
                segment: [["y", "structItem17"], "Y"],
                comment: "Field doc comment inline.",
              },
            }]}
          />
          <StructDef
            id={["Foo", "structItem3"]}
            fields={[[["x", "structItem30"], "X"]]}
            comment="Struct doc comment."
          />
          <StructDef
            id={["Foo", "structItem4"]}
            generics={[{
              id: ["S", "structItemArg10"],
            }, {
              id: ["T", "structItemArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "structItemArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "structItemArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multilineGenerics
            fields={[[["x", "structItem40"], <R n="structItemArg10" />]]}
            comment="Struct doc comment."
          />
        </Pseudocode>

        <P>
          Tuple struct definitions:
        </P>

        <Pseudocode n="tupleStructItem" lineNumbering>
          <TupleStructDef
            id={["Foo", "tupleStructItem8"]}
          />
          <TupleStructDef
            id={["Foo", "tupleStructItem0"]}
            fields={["X"]}
          />
          <TupleStructDef
            id={["Foo", "tupleStructItem1"]}
            fields={[{
              commented: {
                segment: "X",
                comment: "Field doc comment.",
                dedicatedLine: true,
              },
            }, {
              commented: {
                segment: "Y",
                comment: "Field doc comment inline.",
              },
            }]}
          />
          <TupleStructDef
            id={["Foo", "tupleStructItem9"]}
            fields={[{
              commented: {
                segment: "X",
                comment: "Field doc comment.",
                dedicatedLine: true,
              },
            }, {
              commented: {
                segment: "Y",
                comment: "Field doc comment inline.",
              },
            }]}
            multilineFields
          />
          <TupleStructDef
            id={["Foo", "tupleStructItem3"]}
            fields={["X"]}
            comment="Struct doc comment."
          />
          <TupleStructDef
            id={["Foo", "tupleStructItem4"]}
            generics={[{
              id: ["S", "tupleStructItemArg10"],
            }, {
              id: ["T", "tupleStructItemArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "tupleStructItemArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "tupleStructItemArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multilineGenerics
            fields={[<R n="tupleStructItemArg10" />]}
            comment="Struct doc comment."
          />
        </Pseudocode>

        <P>
          Enum definitions:
        </P>

        <Pseudocode n="enumItem" lineNumbering>
          <Enum
            id={["Foo", "enum0"]}
            comment="Enum doc comment."
            generics={[{
              id: ["S", "enumArg10"],
            }, {
              id: ["T", "enumArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "enumArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "enumArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multilineGenerics
            variants={[
              {
                tuple: true,
                id: ["UnitVariantWithoutDocComment", "enumVar0"],
              },
              {
                tuple: true,
                id: ["UnitVariant", "enumVar1"],
                comment: "Unit variant doc comment.",
              },
              {
                tuple: true,
                id: ["TupleVariant", "enumVar2"],
                comment: "Tuple variant doc comment.",
                fields: [<R n="enumArg10" />, <R n="enumArg11" />],
              },
              {
                id: ["StructVariant", "enumVar3"],
                comment: "Struct variant doc comment.",
                fields: [[["x", "enumVar31"], <R n="enumArg11" />], {
                  commented: {
                    segment: [["y", "enumVar32"], <R n="enumArg12" />],
                    comment: "Field doc comment.",
                    dedicatedLine: true,
                  },
                }, {
                  commented: {
                    segment: [["z", "enumVar33"], <R n="enumArg13" />],
                    comment: "Field doc comment inline.",
                  },
                }],
              },
            ]}
          />
        </Pseudocode>

        <P>
          Interface definitions:
        </P>

        <Pseudocode n="interfaceItem" lineNumbering>
          <Interface
            id={["Foo", "interface0"]}
            comment="Interface doc comment."
            generics={[{
              id: ["S", "interfaceArg10"],
            }, {
              id: ["T", "interfaceArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "interfaceArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "interfaceArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multilineGenerics
            members={[
              {
                let: true,
                comment: (
                  <>
                    Comment for a let member. The <Self />{" "}
                    keyword refers to the type implementing the interface. Or at
                    least, that is the intention. This is pseudocode after all,
                    there are no well-defined semantics.
                  </>
                ),
                id: ["someConstant", "interfaceM1"],
                type: <Self />,
              },
              {
                comment: "Comment for a function member.",
                id: ["someFunction", "interfaceM2"],
                generics: [{
                  id: ["S", "interfaceM2A1"],
                }],
                args: [
                  ["foo", "interfaceM2A53", <R n="interfaceM2A1" />],
                  {
                    commented: {
                      segment: ["bar", "interfaceM2A56", "B"],
                      comment: "bla",
                    },
                  },
                  {
                    commented: {
                      segment: ["baz", "interfaceM2A57", "C"],
                      comment: "bli",
                      dedicatedLine: true,
                    },
                  },
                ],
                ret: "Y",
                multiline: true,
              },
            ]}
          />
        </Pseudocode>

        <P>
          Interface implementation:
        </P>

        <Pseudocode n="implItem" lineNumbering>
          <Impl
            comment="Doc comment for the impl item."
            generics={[{
              id: ["S", "implArg10"],
            }, {
              id: ["T", "implArg11"],
              bounds: ["Eq"],
            }, {
              id: ["U", "implArg12"],
              bounds: ["Eq", "Ord"],
            }, {
              id: ["V", "implArg13"],
              bounds: ["Eq", "Ord"],
              multiline: true,
            }]}
            multilineGenerics
            iface={
              <TypeApplication
                constr="interface0"
                args={[
                  <R n="implArg10" />,
                  <R n="implArg11" />,
                  <R n="implArg12" />,
                  <R n="implArg13" />,
                ]}
              />
            }
            type="Bla"
            members={[
              {
                let: true,
                id: ["someConstant", "impl0"],
                type: "Bla",
                comment: "Doc comment for the implementation of a let member.",
                children: "17",
              },
              {
                id: ["someFunction", "impl1"],
                comment:
                  "Doc comment for the implementation of a function member.",
                generics: [{
                  id: ["S", "implM2A1"],
                }],
                args: [
                  ["foo", "implM2A53", <R n="implM2A1" />],
                  {
                    commented: {
                      segment: ["bar", "implM2A56", "B"],
                      comment: "bla",
                    },
                  },
                  {
                    commented: {
                      segment: ["baz", "implM2A57", "C"],
                      comment: "bli",
                      dedicatedLine: true,
                    },
                  },
                ],
                ret: "Y",
                multilineArgs: true,
                body: [
                  <>
                    <Return>
                      <QualifiedMember type="Bla" member="impl0" />
                    </Return>
                  </>,
                ],
              },
            ]}
          />
        </Pseudocode>
      </Hsection>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);
