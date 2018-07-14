# Victory based timeline implementation

This POC implements the timeline component using Victory.
[Victory](https://formidable.com/open-source/victory/) is an MIT-licensed set
of React components that wrap D3.js that provide rich tools for building
interactive visualizations.


## Implementation Notes:

 * Victory has responsive support builtin, but the dimensions it picks do not fit
   our design spec. As such, the main Timeline component maintains some state for
   correctly setting dimensions based on the current width of the viewport. This
   responsibility should be refactored to an HOC that passes down


## TODO

- [ ] clicking on image icon updates chi display
- [ ] multiple graphs + controls
- [ ] fix issue with chart width when user is zoomed


stretch:
- scrubber component
- brush support for defining CHDs
- user event/note annotations on timeline
