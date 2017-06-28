# React Data Loader [![Build Status](https://travis-ci.org/lucasconstantino/react-data-loader.svg?branch=master)](https://travis-ci.org/lucasconstantino/react-data-loader)

> Dead simple data loader helper for React

## Disclaimer

Use it not for big projects! If you project needs lots of API communication you'll be probably better off using tools such as [GraphQL](http://graphql.org/) (I personally recommend [Apollo](https://www.apollodata.com/) for that task) or even [Redux](http://redux.js.org/) with [`redux-thunk`](https://github.com/gaearon/redux-thunk). Sometimes, though, these are too much.

## Why this package?

When loading external data in a React component - be it on user interaction or during mounting phase - we end up rewriting the same logic all over again: loading status, error responses, etc. This could be much simpler and a lot more standardized. Nowadays we use component composition and Higher-Order Components and they are cool. Let's use them.

## Inspiration

I've lately being coding most of my projects using the Apollo stack. As with any API client, the [Apollo/React](https://github.com/apollographql/react-apollo) integration package provides easy data [request status and meta information](http://dev.apollodata.com/react/queries.html#default-result-props), right in the component as a simple prop. I wanted that when coding simpler projects too, but without API setup hassle :)

## Install

`yarn add react-data-loader`

> Or, good ol' `npm install --save react-data-loader`

## Usage

### Simple as can

```js
import { withDataLoader } from 'react-data-loader'

const MyDataLoaderComponent = ({ myData }) => (
  <div>
    { JSON.stringify(myData) }
    <button onClick={ myData.load } disabled={ myData.loading }>Load!</button>
  </div>
)

// Using Fetch API.
const loader = props => e => fetch('/api/data.json').then(res => res.json())

export default withDataLoader('myData', loader)(MyDataLoaderComponent)
```

## License

Copyright (c) 2017 Lucas Constantino Silva

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
