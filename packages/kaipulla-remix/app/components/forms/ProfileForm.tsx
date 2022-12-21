import React, { useEffect, useState } from "react"
import { Paper, Stack, Radio, TextInput, Button, Flex } from "@mantine/core"
import { useFetcher } from "@remix-run/react"
import { IconDeviceFloppy } from "@tabler/icons"

export type UserFormData = {
  gender: string
  firstname: string
  lastname: string
  streetname: string
  housenumber: string
  postalcode: number | undefined
  city: string
  country: string
  phone: string
  email: string
  userId: string | undefined
  profileId?: string | undefined
}

interface UserFormProps {
  actionData: any
  classes: any
  formData: UserFormData
  onCancel: () => void
  onComplete: ({
    success,
    message,
  }: {
    success: boolean
    message: string
  }) => void
}

export const UserForm = ({
  actionData,
  formData,
  onCancel,
  onComplete,
}: UserFormProps) => {
  const userFormFetcher = useFetcher()

  const {
    gender,
    firstname,
    lastname,
    streetname,
    housenumber,
    postalcode,
    city,
    country,
    phone,
    email,
  } = formData

  const [cachedFormData] = useState(JSON.stringify(formData))

  useEffect(() => {
    if (userFormFetcher.type === "done" && userFormFetcher.data.success) {
      onComplete({
        success: true,
        message: "Please re-login to see the changes.",
      })
    }
  }, [onComplete, userFormFetcher.data, userFormFetcher.type])

  return (
    <Paper radius='md' p={3}>
      <userFormFetcher.Form method='post'>
        <Stack>
          <Radio.Group
            name='gender'
            spacing='md'
            size='sm'
            required
            defaultValue={gender}
            label='Select one'
          >
            <Radio value='m' label='Mr' />
            <Radio value='f' label='Mrs' />
            <Radio value='d' label='Diverse' />
          </Radio.Group>
          <Flex justify={"space-between"} miw={"100%"}>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                /*      onInvalid={(e: any) =>
                  e.target.setCustomValidity(i18n.resolvedLanguage ==='de' ? 'Bitte Bitte' : 'Please fill this field')
                } */
                required
                label='Firstname'
                name='firstname'
                defaultValue={firstname}
                error={
                  userFormFetcher.data?.errors?.firstname ??
                  userFormFetcher.data?.errors?.firstname
                }
              />
            </Flex>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                required
                name='lastname'
                label='Lastname'
                defaultValue={lastname}
                error={
                  userFormFetcher.data?.errors?.lastname ??
                  userFormFetcher.data?.errors?.lastname
                }
              />
            </Flex>
          </Flex>

          <TextInput
            error={
              (actionData?.result?.errors?.email ??
                actionData?.result?.errors?.email) ||
              (actionData?.strapiErrors?.isEmailExists
                ? "Given email address is already exists"
                : "")
            }
            name='email'
            label='Email'
            disabled
            defaultValue={email}
            placeholder='hi@xrnetwork.de'
          />

          <Flex justify={"space-between"} miw={"100%"}>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                /*      onInvalid={(e: any) =>
                  e.target.setCustomValidity(i18n.resolvedLanguage ==='de' ? 'Bitte Bitte' : 'Please fill this field')
                } */
                required
                label='Street Name'
                name='streetname'
                defaultValue={streetname}
                error={
                  userFormFetcher.data?.errors?.streetname ??
                  userFormFetcher.data?.errors?.streetname
                }
              />
            </Flex>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                name='housenumber'
                label='House Number'
                defaultValue={housenumber}
                error={
                  actionData?.result?.errors?.lastname ??
                  actionData?.result?.errors?.lastname
                }
              />
            </Flex>
          </Flex>
          <Flex justify={"space-between"} miw={"100%"}>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                /*      onInvalid={(e: any) =>
                  e.target.setCustomValidity(i18n.resolvedLanguage ==='de' ? 'Bitte Bitte' : 'Please fill this field')
                } */
                required
                label='Postal Code'
                name='postalcode'
                defaultValue={postalcode}
                error={
                  userFormFetcher.data?.errors?.postalcode ??
                  userFormFetcher.data?.errors?.postalcode
                }
              />
            </Flex>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                required
                name='city'
                label='City'
                defaultValue={city}
                error={
                  userFormFetcher.data?.errors?.city ??
                  userFormFetcher.data?.errors?.city
                }
              />
            </Flex>
          </Flex>
          <Flex justify={"space-between"} miw={"100%"}>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                /*      onInvalid={(e: any) =>
                  e.target.setCustomValidity(i18n.resolvedLanguage ==='de' ? 'Bitte Bitte' : 'Please fill this field')
                } */
                label='Country'
                name='country'
                defaultValue={country}
                error={
                  actionData?.result?.errors?.firstname ??
                  actionData?.result?.errors?.firstname
                }
              />
            </Flex>
            <Flex miw={"48%"}>
              <TextInput
                miw={"100%"}
                name='phone'
                label='Phone (Opt)'
                defaultValue={phone}
                error={
                  actionData?.result?.errors?.lastname ??
                  actionData?.result?.errors?.lastname
                }
              />
            </Flex>
            <input hidden name='_cacheData' defaultValue={cachedFormData} />
          </Flex>

          <Flex justify={"space-between"} mt='xl'>
            <Button onClick={onCancel} variant='outline' color='red'>
              Cancel
            </Button>
            <Button
              leftIcon={<IconDeviceFloppy size={16} />}
              loading={userFormFetcher.state === "submitting"}
              type='submit'
              name='_action'
              value='from-user-form'
              variant='outline'
            >
              Save
            </Button>
          </Flex>
        </Stack>
      </userFormFetcher.Form>
    </Paper>
  )
}
