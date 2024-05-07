import {
  A,
  Access,
  AccessStruct,
  AccessTuple,
  And,
  ArrayType,
  B,
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
  DefValue,
  DefVariant,
  Delimited,
  Delimiters,
  Em,
  EnumLiteral,
  EnumLiteralRaw,
  EscapeHtml,
  Expression,
  Expressions,
  FunctionType,
  FunctionTypeNamed,
  Gt,
  Gte,
  H,
  Hsection,
  Indent,
  InlineComment,
  Keyword,
  Land,
  Li,
  Loc,
  Lt,
  Lte,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  Ol,
  P,
  Parens,
  PointerType,
  Pre,
  PreviewScope,
  Pseudocode,
  R,
  Rb,
  Rc,
  Rcb,
  Record,
  RefLoc,
  Rs,
  Rsb,
  Sidenote,
  Sidenotes,
  SliceType,
  Span,
  SpliceLoc,
  Strong,
  Struct,
  Tuple,
  TupleStruct,
  TupleType,
  TypeAnnotation,
  TypeApplication,
  TypeApplicationRaw,
  Ul,
  WaitForMarginales,
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
        The API is rather extensive, so we split it into four groups:{" "}
        <R n="inlineTypes">type operators</R>,{" "}
        <R n="inlineExpressions">expressions</R>,{" "}
        <R n="rusticStatements">statements</R>, and{" "}
        <R n="rusticItems">items</R>.
      </P>

      <PreviewScope>
        <P>
          Rustic is integrated with DefRef, and creates definitions of several
          kinds: values, functions, types, fields, enum variants, and
          interfaces. For each of these, there is a macro to manually create
          these kinds of definitions: <DefValue n="some_value" />,{" "}
          <DefFunction n="some_function" />, <DefType n="SomeType" />,{" "}
          <DefField n="some_field" />, <DefVariant n="SomeVariant" />, and{" "}
          <DefInterface n="SomeInterface" />.
        </P>
      </PreviewScope>

      <P>
        You can reference these definitions anywhere: in body text, in
        pseudocode, and in code comments. <R n="some_value" />,{" "}
        <R n="some_function" />, <R n="SomeType" />, <R n="some_field" />,{" "}
        <R n="SomeVariant" />, <R n="SomeInterface" />.
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
          proident, sunt in culpa qui officia deserunt mollit anim id est{" "}
          <R n="SomeInterface" />.
        </CommentLine>
        <Loc>
          <R n="some_value" />, <R n="some_function" />, <R n="SomeType" />,
          {" "}
          <R n="some_field" />, <R n="SomeVariant" />, <R n="SomeInterface" />
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
      </Hsection>

      <Hsection n="rusticStatements" title="Statements"></Hsection>

      <Hsection n="rusticItems" title="Items"></Hsection>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

// enum is expression
// anonymous function (closure)
// function application
// array literal, repeated array literal
// referencing and dereferencing
// taking slices, dereferencing slices

// primitive literals

// Add line comments to Loc macro
