import React, { useState } from 'react';
import PropType from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Article from '../article';

const propTypes = { articleData: PropType.object };
const card = ({ articleData }) => {
  const EXPAND = 'Expand to see More';
  const RETRACT = 'Show less';

  const [cardActionText, setCardActionText] = useState(EXPAND);
  const [showFull, setShowFull] = useState(false);

  const switchExpand = () => {
    const newText = showFull ? EXPAND : RETRACT;
    setCardActionText(newText);
    setShowFull(!showFull);
  };

  return (
    <Card style={{ margin: '6px' }}>
      <CardContent style={{ margin: '6px', 'min-height': '200px' }}>
        <Article {...articleData} showFull={showFull} />
      </CardContent>
      <CardActions style={{ 'align-items': 'center', 'justify-content': 'center' }}>
        <Button onClick={() => switchExpand()} size="small">{cardActionText}</Button>
      </CardActions>
    </Card>);
};

card.propTypes = propTypes;
export default card;
