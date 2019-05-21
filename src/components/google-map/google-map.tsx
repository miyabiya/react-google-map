import * as React from 'react'
import { useState, Fragment } from 'react'
import Map from './map'
import { MapOptions, Maps } from 'google-map-react'
import Marker from './marker'
import { Color } from '../../brand'

export interface Props {
  places: {
    name: string
    imageUrl: string
    sporName: string
    geoPoint: {
      lat: number
      lng: number
    }
  }[]
}

const GoogleMap = (props: Props) => {
  const [currentKey, setCurrentKey] = useState(-1)
  const getMapBounds = (map: any, maps: any, places: any) => {
    const bounds = new maps.LatLngBounds()

    places.forEach((place: any) => {
      bounds.extend(new maps.LatLng(place.geoPoint.lat, place.geoPoint.lng))
    })
    return bounds
  }
  const changeBalloon = (key: string) => {
    const keyNumber = Number(key)
    if (currentKey === keyNumber) {
      setCurrentKey(-1)
    } else {
      setCurrentKey(keyNumber)
    }
  }

  // Re-center map when resizing the window
  const bindResizeListener = (
    map: any,
    maps: any,
    bounds: any,
    places: any
  ) => {
    const path = new maps.Polyline({
      path: places.map((p: any) => p.geoPoint),
      geodesic: true,
      strokeColor: Color.Default,
      strokeOpacity: 1,
      strokeWeight: 3,
    })

    path.setMap(map)
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds)
      })
    })
  }

  // Fit map to its bounds after the api is loaded
  const apiLoaded = (map: any, maps: any, places: any) => {
    // Get bounds by our places
    const bounds = getMapBounds(map, maps, places)
    // Fit map to bounds
    map.fitBounds(bounds)
    // Bind the resize listener
    bindResizeListener(map, maps, bounds, places)
  }

  const createMapOptions = (maps: Maps): MapOptions => {
    return {
      mapTypeControlOptions: {
        position: maps.ControlPosition.TOP_RIGHT,
      },
      mapTypeControl: false,
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e9e9e9',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'landscape',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: 'road.local',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dedede',
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              visibility: 'on',
            },
            {
              color: '#ffffff',
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              saturation: 36,
            },
            {
              color: '#333333',
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off',
            },
          ],
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [
            {
              color: '#f2f2f2',
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#fefefe',
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [
            {
              color: '#fefefe',
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
      ],
    }
  }
  return (
    <Fragment>
      {props.places.length > 0 && (
        <Map
          defaultZoom={15}
          defaultCenter={props.places[0].geoPoint}
          options={createMapOptions}
          onChildClick={(key: string) => changeBalloon(key)}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => apiLoaded(map, maps, props.places)}
        >
          {props.places.map((place, index: number) => (
            <Marker
              key={index}
              name={place.name}
              sporName={place.sporName}
              imageUrl={place.imageUrl}
              lat={place.geoPoint.lat}
              lng={place.geoPoint.lng}
              showBalloon={currentKey === index}
            />
          ))}
        </Map>
      )}
    </Fragment>
  )
}

export default GoogleMap
