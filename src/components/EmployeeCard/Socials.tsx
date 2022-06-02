import React, { FunctionComponent, memo } from 'react'
import { HStack, Icon, Link } from '@chakra-ui/react'
import { ImLinkedin, ImTwitter, ImGithub } from 'react-icons/im'
import { SiStackoverflow } from 'react-icons/si'
import { IconType } from 'react-icons'

const getUrl = (baseUrl: string, userId: string): string => {
  if (userId.charAt(0) === '/') {
    return baseUrl + userId
  }
  return `${baseUrl}/${userId}`
}

const ICON_SIZE = { base: '28px', sm: '22px' }

type SocialProps = {
  [key: string]: {
    icon: IconType
    baseUrl: string
    color: string
  }
}

const socialInfo: SocialProps = {
  gitHub: {
    icon: ImGithub,
    baseUrl: 'https://github.com',
    color: '#000',
  },
  twitter: {
    icon: ImTwitter,
    baseUrl: 'https://twitter.com',
    color: '#1DA1F2',
  },
  stackOverflow: {
    icon: SiStackoverflow,
    baseUrl: 'https://stackoverflow.com/users',
    color: '#F48024',
  },
  linkedIn: {
    icon: ImLinkedin,
    baseUrl: 'https://www.linkedin.com',
    color: '#0077B5',
  },
}

const Socials: FunctionComponent<{ socials: { [key: string]: string } }> = ({ socials }) => {
  const allSocials = Object.keys(socials).map((key) => {
    const { icon, baseUrl, color } = socialInfo[key]
    const url = getUrl(baseUrl, socials[key])

    return (
      <Link href={url} target="_blank" rel="noreferrer" key={key} opacity={0.75} _hover={{ opacity: 1 }}>
        <Icon as={icon} color={color} h={ICON_SIZE} w={ICON_SIZE} />
      </Link>
    )
  })

  return (
    <HStack py={3} spacing={4} h={12}>
      {allSocials}
    </HStack>
  )
}

export default memo(Socials)
