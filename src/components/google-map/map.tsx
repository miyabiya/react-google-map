import * as React from 'react'
import * as PropTypes from 'prop-types'
import styled from 'styled-components'
import GoogleMapReact, { BootstrapURLKeys } from 'google-map-react'
const bootstrapURLKeys: BootstrapURLKeys = {
  key: process.env.GOOGLE_API || ''
}
const Map = ({ children, ...props }) => (
  <Wrapper>
    <GoogleMapReact
      bootstrapURLKeys={bootstrapURLKeys}
      {...props}
    >
      {children}
    </GoogleMapReact>
  </Wrapper>
)

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Map.defaultProps = {
  children: null,
}

export default Map

const Wrapper = styled.main`
  width: 100%;
  height: 100%;
  .gm-style-iw-t {
    display: none;
    &:after {
      display: none;
    }
  }
`
