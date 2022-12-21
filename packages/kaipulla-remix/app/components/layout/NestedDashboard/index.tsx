import {
  Navbar,
  Group,
  Code,
  ScrollArea,
  createStyles,
  Flex,

} from "@mantine/core"
import { UserButton } from "../common/UserButton"
import { LinksGroup } from "../common/NavbarLinksGroup"
import { Logo } from "../common/Logo"
import type { ReactElement, ReactNode } from "react"
import type { TablerIcon } from "@tabler/icons"

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}))

export type NavLinkType = {
  label: string
  link: string
}

export type NavItemType = {
  label: string
  icon: TablerIcon
  initiallyOpened?: boolean
  links?: NavLinkType[]
}

export type UserButtonData = {
  fullname: string
  email: string
  image?: string
}

interface NestedDashboardProps {
  children: ReactNode
  navData: NavItemType[]
  userButtonData: UserButtonData
}

export const NestedDashboardLayout = ({
  children,
  navData,
  userButtonData
}: NestedDashboardProps): ReactElement => {
  const { classes } = useStyles()
  const links = navData.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <Flex style={{ height: "100vh" }}>
      <>
        <Navbar width={{ sm: 300, md: 300 }} p='md' className={classes.navbar}>
          <Navbar.Section className={classes.header}>
            <Group position='apart'>
              <Logo />
              <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
            </Group>
          </Navbar.Section>

          <Navbar.Section grow className={classes.links} component={ScrollArea}>
            <div className={classes.linksInner}>{links}</div>
          </Navbar.Section>

          <Navbar.Section className={classes.footer}>
            <UserButton
              image={userButtonData.image}
              name={userButtonData.fullname}
              email={userButtonData.email}
            />
          </Navbar.Section>
        </Navbar>
      </>
      <Flex
        style={{ overflowY: "scroll", width: "100%", borderRadius: "0.25rem" }}
        direction='column'
        m={"0.5rem"}        
      >
        {children}
      </Flex>
    </Flex>
  )
}
