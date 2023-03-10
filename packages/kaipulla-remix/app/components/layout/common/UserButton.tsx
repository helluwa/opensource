import type { UnstyledButtonProps } from "@mantine/core"
import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  createStyles,
} from "@mantine/core"
import { IconChevronRight } from "@tabler/icons"
import type { ReactElement } from "react"

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  image?: string
  name: string
  email: string
  icon?: React.ReactNode
}

export const UserButton = ({
  image,
  name,
  email,
  icon,
  ...others
}: UserButtonProps): ReactElement => {
  const { classes } = useStyles()

  return (
    <UnstyledButton className={classes.user} {...others}>
      {image && <Avatar src={image} radius='xl' />}
      <Group>
        <div style={{ flex: 1 }}>
          <Text size='sm' weight={500}>
            {name}
          </Text>

          <Text color='dimmed' size='xs'>
            {email}
          </Text>
        </div>

        {icon || <IconChevronRight size={14} stroke={1.5} />}
      </Group>
    </UnstyledButton>
  )
}
