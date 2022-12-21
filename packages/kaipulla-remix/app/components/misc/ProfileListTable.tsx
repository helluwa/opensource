import { useState } from "react"
import {
  createStyles,
  Table,
  ScrollArea,
  Flex,
  Space,
  Modal,
} from "@mantine/core"
import type { ProfileType } from "@helluwa/kaipulla-core"
import { IconEdit, IconRecycle, IconTrash } from "@tabler/icons"

const useStyles = createStyles((theme) => ({
  header: {
    position: "sticky",
    top: 0,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    transition: "box-shadow 150ms ease",

    "&::after": {
      content: '""',
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === "dark"
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}))

interface ProfileListTableProps {
  data: ProfileType[]
}

export function ProfileListTable({ data }: ProfileListTableProps) {
  const { classes, cx } = useStyles()
  const [scrolled, setScrolled] = useState(false)



  const rows = data.map((row) => (
    <tr key={row.id}>
      <td>{row.label}</td>
      <td>{row.description}</td>
      <td>{`${row.lastUsedAt}`}</td>
      <td>{`${row.createdAt}`}</td>
      <td>{`${row.expiresAt}`}</td>
      <td>
        <Flex>
          <IconEdit style={{ cursor: "pointer" }} color='blue' size={18} />
          <Space w={"md"} />
          <IconTrash style={{ cursor: "pointer" }} color='red' size={18} />
        </Flex>
      </td>
    </tr>
  ))

  return (
    <>
      <ScrollArea
        sx={{ height: 300 }}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.header, { [classes.scrolled]: scrolled })}
          >
            <tr>
              <th>Label</th>
              <th>Description</th>
              <th>Last Used</th>
              <th>Created At</th>
              <th>Expired At</th>
              <th>Actions </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>

    </>
  )
}
