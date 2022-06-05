import React, { FunctionComponent } from 'react'
import { Center, CenterProps, Spinner as SSpinner, SpinnerProps } from '@chakra-ui/react'

type OwnProps = {
  spinnerProps?: SpinnerProps
}

type Props = OwnProps & CenterProps

const Spinner: FunctionComponent<Props> = ({ spinnerProps, ...centerProps }) => {
  return (
    <Center overflow="hidden" {...centerProps}>
      <SSpinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" {...spinnerProps} />
    </Center>
  )
}

export default React.memo(Spinner)
