export default [
  {
    id: 1,
    blocked: false,
    open: false,
    iterations: [
      {
        id: 1,
        title: 'Iteration 1',
        size: '',
        selected: true,
        open: false
      }
    ]
  },
  {
    id: 2,
    blocked: true,
    open: false,
    iterations: [
      {
        id: 2,
        title: 'Iteration 1',
        size: '',
        selected: false,
        open: false
      },
      {
        id: 3,
        title: 'Iteration 2',
        size: '',
        selected: true,
        open: false
      }
    ]
  },
  {
    id: 3,
    blocked: false,
    open: true,
    iterations: [
      {
        id: 2,
        title: 'Iteration 1',
        size: '',
        selected: false,
        open: false
      },
      {
        id: 3,
        title: 'Iteration 2',
        size: '',
        selected: true,
        open: false
      }
    ]
  }
]
