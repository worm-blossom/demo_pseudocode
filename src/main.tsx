import {
  A,
  B,
  Code,
  Config,
  ConfigPseudocode,
  ConfigStructuredcode,
  Context,
  Counter,
  Def,
  Delimited,
  Delimiters,
  DocComment,
  Em,
  EscapeHtml,
  Expression,
  Expressions,
  H,
  Hsection,
  Indent,
  Li,
  Loc,
  M,
  makeFigureMacro,
  makeNumberingRenderer,
  Marginale,
  MM,
  Ol,
  P,
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
  Span,
  SpliceLoc,
  Strong,
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
          <Code>macromania_rusticcode</Code>{" "}
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

      <Config options={[<ConfigStructuredcode delimiterStyle="c"/>]}>
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

      <Config options={[<ConfigStructuredcode delimiterStyle="ruby"/>]}>
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
        <DocComment>Bla bla bla <Em>blubb</Em> bla bla.</DocComment>
          <Loc>
            let x = 17;
          </Loc>
          <DocComment><P>Bla bla bla <Em>blubb</Em> bla bla.</P><P>Plip plop plang!</P></DocComment>
          <Loc>
            x = 18;
          </Loc>
        </Pseudocode>
    </Hsection>
  </ArticleTemplate>
);

// Evaluate the expression. This has exciting side-effects,
// like creating a directory that contains a website!
ctx.evaluate(exp);
