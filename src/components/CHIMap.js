import React from 'react';
import styled from 'styled-components';


const PolyMock = styled.section`
  background: #76b041;
  border: 3px solid #4c712a;
  color: #fff;
  text-align: center;
  left: 25%;
  width: 50%;
  top: 25%;
  height: 4em;
  position: absolute;
`

export default ({activeDate}) => (
  <PolyMock>
    {activeDate.toLocaleDateString('en-US', {month:  'numeric', day: 'numeric'})}
  </PolyMock>
)
