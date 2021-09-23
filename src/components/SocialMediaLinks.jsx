import { ButtonGroup, IconButton } from '@chakra-ui/react'
import * as React from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const LINKEDIN_URL = "https://www.linkedin.com/in/svschaik/";
const GITHUB_URL = "https://github.com/devsiriso/"

export const SocialMediaLinks = (props) => (
    <ButtonGroup variant="ghost" color="gray.600" {...props}>
        <IconButton as="a" href={LINKEDIN_URL} aria-label="LinkedIn" icon={<FaLinkedin fontSize="20px" />} />
        <IconButton as="a" href={GITHUB_URL} aria-label="GitHub" icon={<FaGithub fontSize="20px" />} />
    </ButtonGroup>
)
