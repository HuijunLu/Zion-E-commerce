import { render, screen, fireEvent } from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import React from 'react';
import '@testing-library/jest-dom';
import axios from 'axios';
import RRMockData from './RRMockData.js';
import App from '../../App.jsx';
import RatingsReviews from '../RatingsReviews.jsx';
import ReviewSort from '../components/ReviewSort.jsx';
import ReviewList from '../components/ReviewList.jsx';
import ReviewTile from '../components/ReviewTile.jsx';
import MoreReviews from '../components/MoreReviews.jsx';

jest.mock('axios');

it('Ratings and Reviews Sort Option should default to relevant', () => {
  render(<ReviewSort reviews = {ReviewList}/>);
  expect(screen.getByText(/relevant/i)).toBeInTheDocument();
});


describe('Ratings and Reviews each tile should have expected behavior', () => {

  it('user can only put helpful on each tile once, the second click should be disabled', async () => {

    axios.put.mockImplementation (url => {
      if (url === '/reviews/1115643/helpful') {
        return Promise.resolve ()
      }
    })

    render(<ReviewTile review={RRMockData.results[0]}/>);
    const helpfulLinkElement = screen.getByTestId('testHelpfulLink');
    fireEvent.click(helpfulLinkElement);
    expect(helpfulLinkElement).not.toBeInTheDocument();
  });

  it('user can only report each tile once, the second click should be disabled', () => {

    axios.put.mockImplementation (url => {
      if (url === '/reviews/1115643/report') {
        return Promise.resolve ()
      }
    })

    render(<ReviewTile review={RRMockData.results[0]}/>);
    const reportLinkElement = screen.getByTestId('reportLinkElement');
    fireEvent.click(reportLinkElement);
    expect(reportLinkElement).not.toBeInTheDocument();
  });

});



const mockedSetReviewsRenderCount = jest.fn();

describe('Ratings and Reviews list behaviors', () => {

  it('only 2 review tiles show upon opening of website', () => {
    render(<ReviewList reviews={RRMockData.results} reviewsrenderedcount={2} selectedstars={[]}/>);
    const reviewTileElements = screen.getAllByTestId('reviewtile');
    expect(reviewTileElements.length).toBe(2);
  });

  it('click more reviews button should set reviewsrendered counts', () => {
    render(<MoreReviews reviews={RRMockData.results} setReviewsrenderedcount={ mockedSetReviewsRenderCount}/>);
    const moreReviewButton = screen.getByTestId('moreReviews');
    fireEvent.click(moreReviewButton);
    expect(mockedSetReviewsRenderCount).toBeCalled();
  });



});