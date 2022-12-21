import type { ProfileType } from "@helluwa/kaipulla-core"
import { Button, Center, Flex, Modal, Space, Title } from "@mantine/core"
import type { ActionFunction, LoaderFunction } from "@remix-run/node"
import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useState } from "react"
import { NestedDashboardLayout } from "~/components/layout/NestedDashboard"
import { ProfileListTable } from "~/components/misc/ProfileListTable"
import { navItems } from "~/data/navitems"
import { kaipulla } from "~/kaipulla.server"

type ProfileLoaderData = {
  profiles: ProfileType[]
}


export const loader: LoaderFunction = async () => {
  const profiles = await kaipulla.content.profile.getList()
  return json({ profiles })
}
export default function Index() {
  const { profiles } = useLoaderData() as ProfileLoaderData

  const [showForm, setShowForm] = useState(false)

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <NestedDashboardLayout
        navData={navItems}
        userButtonData={{
          fullname: "Karthikeyan Mariappan",
          email: "karthikeyanmariappan@mariappan.de",
        }}
      >
        <Space h={"lg"} />
        <Center display={"flex"} style={{ flexDirection: "column" }}>
          <Flex px={50} w={"100%"} justify='space-between'>
            <Title order={3} color='grape'>
              API KEYS
            </Title>
            <Button onClick={() => setShowForm(true)} variant='outline'>
              Create Api Key
            </Button>
          </Flex>
          <Space h={"xl"} />
          <div style={{ width: "95%" }}>
            <ProfileListTable data={profiles} />
          </div>
        </Center>
      </NestedDashboardLayout>

      <Modal
        style={{ zIndex: 2100 }}
        opened={showForm}
        onClose={() => {
          setShowForm(false)
        }}
      ></Modal>
    </div>
  )
}
