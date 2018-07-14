# Victory based timeline implementation

This POC implements the timeline component using Victory.
[Victory](https://formidable.com/open-source/victory/) is an MIT-licensed set
of React components that wrap D3.js that provide rich tools for building
interactive visualizations.

## Highlevel Directory Structure

Directory structure is inspired by the structure of `Next.js` projects. 

```
src
└── components 
    ├── Event.js
    ├── Timeline.js
    └── Tooltip.js
```

This is the meat of the implementation, components should *only* contain
internal state. Prefer writing SFCs when possible. Shared state should come
from props/contexts/redux.

Components do not define their shape in absolute units, and will fill their container.

```
src
└── views
    └── Shell.js
```

Views are responsible for providing structure to a given section of a page.
Multiple views can be combined in a single page.


## Implementation Notes:

 * Victory has responsive support builtin, but the dimensions it picks do not fit
   our design spec. As such, the main Timeline component maintains some state for
   correctly setting dimensions based on the current width of the viewport. This
   responsibility should be refactored to an HOC that passes down


