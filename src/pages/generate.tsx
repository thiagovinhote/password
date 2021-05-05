import { ClipboardIcon, LightningBoltIcon, ShieldCheckIcon } from '@heroicons/react/outline'
import { useState } from 'react'
import { FeedbackAlert } from '~/presentation/components/Alert'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { Scaffold } from '~/presentation/components/Scaffold'
import { TabsModel, ModeItemTab, MemorableForm } from '~/presentation/pages/generate'

export default function Generate() {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <Scaffold title="Generate">
      {/* <DefaultButton color="red" onClick={() => { setShowAlert(!showAlert)}}>Toogle</DefaultButton> */}
      <FeedbackAlert
        data={{ title: 'Nova credencial', description: 'Suas credenciais foram salvas e criptografas' }}
        show={showAlert}
        onDismiss={() => { setShowAlert(false) }}
      />
      <h4 className="font-semibold text-md mb-2">Gerador de senhas seguras</h4>
      <TabsModel>
        <ModeItemTab title="Memorável" icon={ClipboardIcon} color="text-purple-400">
          <MemorableForm />
        </ModeItemTab>
        <ModeItemTab title="Forte" icon={LightningBoltIcon} color="text-yellow-400">
          Forte
        </ModeItemTab>
        <ModeItemTab title="Muito Forte" icon={ShieldCheckIcon} color="text-red-400">
          Muito Forte
        </ModeItemTab>
      </TabsModel>
    </Scaffold>
  )
}
