import { useState } from 'react'
import { FeedbackAlert } from '~/presentation/components/Alert'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Scaffold } from '~/presentation/components/Scaffold'

export default function Generate() {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <Scaffold title="Generate">
      <DefaultButton color="red" onClick={() => { setShowAlert(!showAlert)}}>Toogle</DefaultButton>
      <FeedbackAlert
        data={{ title: 'Nova credencial', description: 'Suas credenciais foram salvas e criptografas' }}
        show={showAlert}
        onDismiss={() => { setShowAlert(false) }}
      />
    </Scaffold>
  )
}
