import * as React from 'react'
import styled from 'styled-components'
import { Color, Size } from '../../brand'

interface Props {
  name: string
  imageUrl: string
  sporName: string
  showBalloon: boolean
  lat: number
  lng: number
}

const Marker = (props: Props) => {
  return (
    <Wrapper>
      {props.showBalloon && (
        <Balloon>
          {props.imageUrl && <img src={props.imageUrl} />}
          <SpotDetail>
            <Name>{props.name}</Name>
          </SpotDetail>
        </Balloon>
      )}
      <FrameIcon isSmall={false}>
        {
          props.sporName
        }
      </FrameIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
  cursor: pointer;
  &:hover {
    z-index: 1;
  }
`

const FrameIcon = styled.div<{ isSmall: boolean }>`
  position: absolute;
  top: -4px;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -4px;
  width: 30px;
  height: 30px;
  border: 3px solid ${Color.Default};
  border-radius: 50%;
  background-color: white;
  > * {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`

const Balloon = styled.div`
  color: black;
  min-width: 210px;
  z-index: 10;
  position: absolute;
  left: calc(50% - 82px);
  display: flex;
  background-color: #fff;
  border: 2px solid ${Color.Default};
  padding: 8px;
  bottom: 100%;
  -webkit-transform: translateY(-8px);
  -ms-transform: translateY(-8px);
  transform: translateY(-13px);
  &:before {
    content: '';
    position: absolute;
    bottom: -16px;
    left: 50%;
    margin-left: -27px;
    border: 8px solid transparent;
    border-top: 8px solid #fff;
    z-index: 2;
  }
  &:after {
    content: '';
    position: absolute;
    bottom: -19px;
    left: 50%;
    margin-left: -29px;
    border: 10px solid transparent;
    border-top: 9px solid ${Color.Default};
    z-index: 1;
  }
  img {
    width: 60px;
    height: 60px;
  }
`
const Name = styled.div`
  font-size: ${Size.Font.Base}px;
  font-weight: ${Size.FontWeight.Bold};
  margin-bottom: 4px;
`

const SpotDetail = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 8px;
`

export default Marker
