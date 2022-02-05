import { TagTypes } from '~/domain/models/tag'
import { DefaultButton } from '~/presentation/components/DefaultButton'
import { SlideOver } from '~/presentation/components/SlideOver'
import { useSet } from '~/presentation/hooks'
import { TagItemSelect } from './tag-item-select'

type FilterValue = {
  tags: string[]
}

export type OnChangeFilter = (value: FilterValue) => void

type Props = {
  open: boolean
  onClose: (value: boolean) => void
  selected?: string[]
  tags?: TagTypes.DTO[]
  onChange?: OnChangeFilter
}

export const FilterForm: React.FC<Props> = props => {
  const tagsSet = useSet<string>(props.selected)

  const handleSelect = (tagId: string) => {
    if (tagsSet.has(tagId)) {
      tagsSet.remove(tagId)
    } else {
      tagsSet.add(tagId)
    }
  }

  const handleApply = () => {
    props.onChange({ tags: tagsSet.values() })
    props.onClose(false)
  }

  return (
    <SlideOver value={props.open} onChange={props.onClose} title="Filtros">
      <div className="border-t border-gray-200 space-y-4 py-4">
        <div>
          <p className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Tags
          </p>

          <div className="space-x-2 space-y-2">
            {props.tags?.map(tag => (
              <TagItemSelect
                key={tag.id}
                value={tagsSet.has(tag.id)}
                onClick={() => handleSelect(tag.id)}
              >
                {tag.label}
              </TagItemSelect>
            ))}
          </div>
        </div>
        <hr />
        <DefaultButton className="w-2/6" color="green" onClick={handleApply}>
          Filtrar
        </DefaultButton>
      </div>
    </SlideOver>
  )
}
