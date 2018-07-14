import React from 'react'
import { VictoryLabel, VictoryTooltip, Flyout, TextSize } from 'victory';

function getLabelPadding(style) {
    if (!style) {
      return 0;
    }
    const paddings = Array.isArray(style) ? style.map((s) => s.padding) : [style.padding];
    return Math.max(...paddings, 0);
}

const ThumbLabel = (props) => {
  const { x, y, datum, text, style } = props;

  const dx = datum.thumb.width / 2;
  const dy = datum.thumb.height + TextSize.approximateTextSize(text, style).height / 2 + getLabelPadding(style);

  return (
    <g>
      <image x={x - dx} y={y - dy} width={datum.thumb.width} height={datum.thumb.height} xlinkHref={datum.thumb.href} alt="tmp" />
      <VictoryLabel {...props} />
    </g>
  )
}


const ThumbFlyout = (props) => {
  const { height, width, datum } = props;
  const heightWithThumbnail = height + datum.thumb.height + 15;
  const widthWithThumbnail = width > datum.thumb.width ? width : datum.thumb.width + width;
  const overriddenProps = Object.assign({}, props, {height: heightWithThumbnail, width: widthWithThumbnail})
  return (
    <Flyout {...overriddenProps} />
  )
}

class TooltipThumb extends React.Component {
  static defaultEvents = VictoryTooltip.defaultEvents;

  render() {
    return (
      <VictoryTooltip
        labelComponent={
          <ThumbLabel />
        }
        flyoutComponent={<ThumbFlyout/>}
        {...this.props}
      />
    )
  }
}

export default TooltipThumb;
