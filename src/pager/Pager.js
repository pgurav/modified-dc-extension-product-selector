import React from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button, makeStyles } from '@material-ui/core';
import { SkipNext, SkipPrevious, ArrowRight, ArrowLeft } from '@material-ui/icons';

import range from 'lodash/range';

import { changePage } from '../store/pages/pages.actions';

const styles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  }
}));

export const PagerComponent = ({ changePage, page: { numPages, curPage } }) => {
  const classes = styles();
  const allPages = range(numPages);
  let pages = [];

  pages = Math.round(allPages.length / 20);

  return (
    <ButtonGroup color="primary" className={classes.root}>
      <Button aria-label="first" onClick={() => changePage(0)} disabled={curPage === 0}>
        <SkipPrevious fontSize="small" />
      </Button>
      <Button aria-label="previous" onClick={() => changePage(curPage - 1)} disabled={curPage === 0}>
        <ArrowLeft fontSize="small" />
      </Button>
      {pages.map(page => (
        <Button variant={page === curPage ? 'contained' : null} key={page} onClick={() => changePage(page)}>
          {page + 1}
        </Button>
      ))}
      <Button aria-label="next" onClick={() => changePage(curPage + 1)} disabled={curPage === numPages - 1}>
        <ArrowRight fontSize="small" />
      </Button>
      <Button aria-label="last" onClick={() => changePage(numPages - 1)} disabled={curPage === numPages - 1}>
        <SkipNext fontSize="small" />
      </Button>
    </ButtonGroup>
  );
};

const Pager = connect(state => ({ page: state.page }), { changePage })(PagerComponent);

export default Pager;
