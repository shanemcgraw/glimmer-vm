import {
  RenderTest,
  test,
  rawModule,
  NodeLazyRenderDelegate,
  SSRSuite,
  SSRComponentSuite
} from "@glimmer/test-helpers";
import { NodeDOMTreeConstruction } from '..';
import { precompile } from "@glimmer/compiler";

class DOMHelperTests extends SSRSuite {
  @test 'can instantiate NodeDOMTreeConstruction without a document'() {
    // this emulates what happens in Ember when using `App.visit('/', { shouldRender: false });`

    let helper = new NodeDOMTreeConstruction(null as any);

    this.assert.ok(!!helper, 'helper was instantiated without errors');
  }
}

class CompilationTests extends RenderTest {
  @test 'generates id in node'() {
    let template = precompile('hello');
    let obj = JSON.parse(template);
    this.assert.equal(obj.id, 'zgnsoV7o', 'short sha of template source');
    template = precompile('hello', { meta: {moduleName: 'template/hello'} });
    obj = JSON.parse(template);
    this.assert.equal(obj.id, 'Ybe5TwSG', 'short sha of template source and meta');
  }
}

rawModule('Server-side rendering in Node.js', DOMHelperTests, NodeLazyRenderDelegate);
rawModule('Id generation', CompilationTests, NodeLazyRenderDelegate);
rawModule("[Bundle Compiler] SSR Components", SSRComponentSuite, NodeLazyRenderDelegate, { componentModule: true });
