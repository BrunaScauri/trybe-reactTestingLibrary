import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';

function renderWithRouter(componentToRender) {
  const history = createMemoryHistory();

  const dataRender = render(
    <Router history={ history }>
      { componentToRender }
    </Router>,
  );

  return { ...dataRender, history };
}

export default renderWithRouter;
