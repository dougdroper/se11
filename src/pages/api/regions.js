const data = [
  {
    name: 'North East',
    id: 'north_east'
  },
  {
    name: 'North West',
    id: 'north_west'
  }
]
export default (req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}
