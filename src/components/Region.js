import { Container } from './container'

export const Region = ({ title }) => (
  <Container
    flexDirection="row"
    position="fixed"
    width="100%"
  bottom="0"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" width='100%' height='320'>
    <path
      fill="#85ccd6" fill-opacity="1" d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,53.3C1120,64,1280,96,1360,112L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
    </svg>
  </Container>
)

Region.defaultProps = {
  title: 'Regions',
}
