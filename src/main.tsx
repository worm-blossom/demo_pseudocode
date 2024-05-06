import {
  A,
  ArrayType,
  B,
  ChoiceType,
  Code,
  Config,
  ConfigPseudocode,
  ConfigStructuredcode,
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
  DocComment,
  Em,
  EscapeHtml,
  Expression,
  Expressions,
  FunctionType,
  FunctionTypeNamed,
  H,
  Hsection,
  Indent,
  Keyword,
  Li,
  Loc,
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
  RefLoc,
  Rs,
  Rsb,
  Sidenote,
  Sidenotes,
  SliceType,
  Span,
  SpliceLoc,
  Strong,
  TupleType,
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
          Three packages for writing pseudocode. The{" "}
          <Code>macromania_pseudocode</Code>{" "}
          package provides low-level functionality such as rendering line
          numbering and indentation. The <Code>macromania_structuredcode</Code>
          {" "}
          package offers mid-level functionality for rendering structured code,
          such as matching delimiters and blocks. Finally, the{" "}
          <Code>macromania_rustic</Code>{" "}
          provides an opinionated, high-level interface for converting abstract
          syntax trees of a Rust-like pseudo-language into rendered pseudocode.
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
      n="midlevel"
      title="Mid-level Macros"
    >
      <P>
        The <Code>macromania_structuredcode</Code>{"  "}
        package provides mid-level facilities for rendering structured code. You
        probably will not use it directly unless defining your own language
        constructs. Still, cannot really hurt to learn what is going on under
        the hood.
      </P>

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
        some content expression in delimiters, optionally places separator in
        between them, and optionally places each of them in its own, indented
        line.
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

      <P>Single line, Python-style.</P>

      <Pseudocode n="delimitedSinglelinePython" lineNumbering>
        <Loc>
          if true{" "}
          <Delimited
            separator=";"
            c={["{", "}"]}
            pythonSkip
            ruby={["then", "endif"]}
            content={["foo()", "bar()", "baz()"]}
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
            content={["foo()", "bar()", "baz()"]}
          />{" "}
          else foo;
        </Loc>
      </Pseudocode>

      <Config options={[<ConfigStructuredcode delimiterStyle="c" />]}>
        <P>Single line, C-style.</P>

        <Pseudocode n="delimitedSinglelineC" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", "bar()", "baz()"]}
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
              content={["foo()", "bar()", "baz()"]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>
      </Config>

      <Config options={[<ConfigStructuredcode delimiterStyle="ruby" />]}>
        <P>Single line, Ruby-style.</P>

        <Pseudocode n="delimitedSinglelineRuby" lineNumbering>
          <Loc>
            if true{" "}
            <Delimited
              separator=";"
              c={["{", "}"]}
              pythonSkip
              ruby={["then", "endif"]}
              content={["foo()", "bar()", "baz()"]}
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
              content={["foo()", "bar()", "baz()"]}
            />{" "}
            else foo;
          </Loc>
        </Pseudocode>
      </Config>

      <P>
        The <Code>DocComment</Code> macro renders a full-line comment.
      </P>

      <Pseudocode n="docComment" lineNumbering>
        <DocComment>
          Bla bla bla <Em>blubb</Em> bla bla.
        </DocComment>
        <Loc>
          let x = 17;
        </Loc>
        <DocComment>
          <P>
            Bla bla bla <Em>blubb</Em> bla bla.
          </P>
          <P>Plip plop plang!</P>
        </DocComment>
        <Loc>
          x = 18;
        </Loc>
      </Pseudocode>

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
        <DocComment>
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
        </DocComment>
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
            <TupleType types={["A", "B", "C"]} />
          </Loc>
          <Loc>
            <TupleType types={["A", "B", "C"]} multiline />
          </Loc>
        </Pseudocode>

        <P>Choice types, i.e., anonymous sum types:</P>

        <Pseudocode n="sumTypes" lineNumbering>
          <Loc>
            <ChoiceType types={["A"]} />
          </Loc>
          <Loc>
            <ChoiceType types={["A", "B", "C"]} />
          </Loc>
          <Loc>
            <ChoiceType types={["A", "B", "C"]} multiline />
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
            <FunctionType args={["A", "B", "C"]} ret="Y" />
          </Loc>
          <Loc>
            <FunctionType args={["A", "B", "C"]} ret="Y" multiline />
          </Loc>
          <DocComment>
            When defining named arguments, the first value in the array is the
            name to be displayed, the second is a unique identifier to pass to
            DefRef, and the third value is the type of the argument.
          </DocComment>
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
                ["bar", "functionTypesb2", "B"],
                ["baz", "functionTypesc2", "C"],
              ]}
              ret="Y"
            />
          </Loc>
          <Loc>
            <FunctionTypeNamed
              args={[
                ["foo", "functionTypesa3", "A"],
                ["bar", "functionTypesb3", "B"],
                ["baz", "functionTypesc3", "C"],
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
            <ArrayType inner={"A"} count="42" />
          </Loc>
        </Pseudocode>

        <P>
          Pointer types, i.e., references to exactly one value of a certain type
          (no null pointers in pseudo code, your readers deserve a type system
          that makes sense):
        </P>

        <Pseudocode n="pointerTypes" lineNumbering>
          <DocComment>
            A pointer that can be read from but not written to.
          </DocComment>
          <Loc>
            <PointerType inner={"A"} />
          </Loc>
          <DocComment>
            A pointer that can be read from and written to.
          </DocComment>
          <Loc>
            <PointerType inner={"A"} mut />
          </Loc>
          <DocComment>
            A pointer that can be written to but not read from.
          </DocComment>
          <Loc>
            <PointerType inner={"A"} mut="writeonly" />
          </Loc>
          <DocComment>
            A pointer that can neither be read from nor written to.
          </DocComment>
          <Loc>
            <PointerType inner={"A"} mut="opaque" />
          </Loc>
        </Pseudocode>

        <P>
          Slice types, i.e., references to one or more values, consecutively
          stored in memory:
        </P>

        <Pseudocode n="sliceTypes" lineNumbering>
          <DocComment>
            A slice that can be read from but not written to.
          </DocComment>
          <Loc>
            <SliceType inner={"A"} />
          </Loc>
          <DocComment>A slice that can be read from and written to.</DocComment>
          <Loc>
            <SliceType inner={"A"} mut />
          </Loc>
          <DocComment>
            A slice that can be written to but not read from.
          </DocComment>
          <Loc>
            <SliceType inner={"A"} mut="writeonly" />
          </Loc>
          <DocComment>
            A slice that can neither be read from nor written to.
          </DocComment>
          <Loc>
            <SliceType inner={"A"} mut="opaque" />
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
            <TypeApplicationRaw constr="List" args={["Foo", "Bar", "Baz"]} />
          </Loc>
          <Loc>
            <TypeApplicationRaw
              constr="List"
              args={["Foo", "Bar", "Baz"]}
              multiline
            />
          </Loc>
          <Loc>
            <TypeApplication constr="SomeType" args={["Foo"]} />
          </Loc>
          <Loc>
            <TypeApplication constr="SomeType" args={["Foo", "Bar", "Baz"]} />
          </Loc>
          <Loc>
            <TypeApplication
              constr="SomeType"
              args={["Foo", "Bar", "Baz"]}
              multiline
            />
          </Loc>
        </Pseudocode>
      </Hsection>

      <Hsection n="inlineExpressions" title="Expressions"></Hsection>

      <Hsection n="rusticStatements" title="Statements"></Hsection>

      <Hsection n="rusticItems" title="Items"></Hsection>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);

// slice types, type-level applications

// tuples: literals, access
// parens
// type annotation
// struct literal, record
// enum literal
// anonymous function (closure)
// function application
// array literal, repeated array literal
// referencing and dereferencing
// taking slices
// lt, gt, lte, gte

// primitive literals
// identifiers
