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
 * By default, victory supports text-only labels and tooltips. To insert images 
   into it, I had to create a custom tooltip element. One consequence is that 
   thumbnail images have to have a known dimension (can be dynamically set by data)

 * don't believe it's possible to maintain a fixed with between days on the scale

## TODO

- [ ] clicking on image icon updates chi display
- [ ] multiple graphs + controls
- [ ] fix issue with chart width when user is zoomed


stretch:
- scrubber component
- brush support for defining CHDs
- user event/note annotations on timeline
