import React, { FunctionComponent } from 'react'
import { Box, BoxProps, Text } from '@chakra-ui/react'
import Image from 'next/image'
import Socials from './Socials'
import { Employee } from '../../../types'

const FALLBACK_IMG = 'https://placeimg.com/240/300/animals'

type OwnProps = {
  employee: Employee
}

type Props = OwnProps & BoxProps

const EmployeeCard: FunctionComponent<Props> = ({
  employee: { gitHub, stackOverflow, twitter, linkedIn, imagePortraitUrl, name, office },
  ...boxProps
}) => {
  const portraitWithFallback = imagePortraitUrl || FALLBACK_IMG
  const officeWithFallback = `Office: ${office || 'The beach'}`
  const socials = {
    ...(gitHub && { gitHub }),
    ...(stackOverflow && { stackOverflow }),
    ...(twitter && { twitter }),
    ...(linkedIn && { linkedIn }),
  }

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      bg="whiteAlpha.800"
      borderRadius={6}
      boxShadow="md"
      p={0}
      w={{ base: '300px', sm: '200px' }}
      {...boxProps}
    >
      <Image
        src={portraitWithFallback}
        alt="Profile photo"
        height="100%"
        width="75%"
        layout="responsive"
        style={{ borderTopLeftRadius: 6, borderTopRightRadius: 6 }}
      />
      <Box px={2} pt={2}>
        <Text fontSize={{ base: '2xl', sm: 'xl' }} fontWeight="500">
          {name}
        </Text>
        <Text fontSize={{ base: 'md', sm: 'sm' }} fontFamily="roboto">
          {officeWithFallback}
        </Text>
        <Socials socials={socials} />
      </Box>
    </Box>
  )
}

export default EmployeeCard
