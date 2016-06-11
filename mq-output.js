console.log(mq(component))

{ controller: [Function: controller], view: [Function: view] }


{ rootEl:
   { tag: 'div',
     attrs: { role: 'toolbar', className: 'undefined' },
     children: [ [Object], [Object], [Object] ] },
  onunloaders: [ undefined ],
  redraw: [Function],
  first: [Function: first],
  has: [Function: has],
  contains: [Function],
  find: [Function],
  setValue: [Function: setValue],
  focus: [Function],
  click: [Function],
  blur: [Function],
  mousedown: [Function],
  mouseup: [Function],
  mouseover: [Function],
  mouseout: [Function],
  mouseenter: [Function],
  mouseleave: [Function],
  keydown: [Function: keydown],
  keypress: [Function: keydown],
  keyup: [Function: keydown],
  trigger: [Function],
  should:
   { not:
      { have: [Function: shouldNotHave],
        contain: [Function: shouldNotContain] },
     have: { [Function: shouldHave] at: [Object] },
     contain: [Function: shouldContain] },
  log: [Function],
  onunload: [Function] }


console.log(mq(m('div', 'hello')))

{ tag: 'div', attrs: {}, children: [ 'hello' ] }

{ rootEl: { tag: 'div', attrs: {}, children: [ 'hello' ] },
  onunloaders: [],
  redraw: [Function],
  first: [Function: first],
  has: [Function: has],
  contains: [Function],
  find: [Function],
  setValue: [Function: setValue],
  focus: [Function],
  click: [Function],
  blur: [Function],
  mousedown: [Function],
  mouseup: [Function],
  mouseover: [Function],
  mouseout: [Function],
  mouseenter: [Function],
  mouseleave: [Function],
  keydown: [Function: keydown],
  keypress: [Function: keydown],
  keyup: [Function: keydown],
  trigger: [Function],
  should:
   { not:
      { have: [Function: shouldNotHave],
        contain: [Function: shouldNotContain] },
     have: { [Function: shouldHave] at: [Object] },
     contain: [Function: shouldContain] },
  log: [Function],
  onunload: [Function] }


////
//v1

mq(appComponent)

{ component: { oninit: [Function: oninit], view: [Function: view] } }

{ onremovers: [],
  redraw: [Function],
  rootNode:
   { tag: 'div',
     key: undefined,
     attrs: undefined,
     children: undefined,
     text: 'Hello world!',
     dom: undefined,
     domSize: undefined,
     state: {},
     events: undefined,
     instance: undefined,
     parent: undefined },
  first: [Function: first],
  has: [Function: has],
  contains: [Function],
  find: [Function],
  setValue: [Function: setValue],
  focus: [Function],
  click: [Function],
  blur: [Function],
  mousedown: [Function],
  mouseup: [Function],
  mouseover: [Function],
  mouseout: [Function],
  mouseenter: [Function],
  mouseleave: [Function],
  keydown: [Function: keydown],
  keypress: [Function: keydown],
  keyup: [Function: keydown],
  trigger: [Function],
  should:
   { not:
      { have: [Function: shouldNotHave],
        contain: [Function: shouldNotContain] },
     have: { [Function: shouldHave] at: [Object] },
     contain: [Function: shouldContain] },
  log: [Function],
  onremove: [Function] }
