import { Button, GreenButton  } from "@helluwa/ui"
export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <div onClick={() => alert("hit")}>
        <Button text='Appuram' />
        <GreenButton />
        <GreenButton />
      </div>
    </div>
  )
}
