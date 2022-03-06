import { useMemo, useState } from 'react'
import { makeApiAuthMe, makeApiLoadTags } from '~/main/factories/usecases'
import { ssrAuth, TagPaginator } from '~/presentation/helpers'
import {
  IndexTemplate,
  IndexTemplateProps
} from '~/presentation/templates/profile'
import { PlainObject, ReadonlyRequired } from '~/domain/fields/plain-object'
import { Paginator } from '~/domain/models/paginator'
import { Tag } from '~/domain/models/tag'
import { User } from '~/domain/models/user'

type Props = {
  user: ReadonlyRequired<User>
  tags: ReadonlyRequired<Paginator<Tag>>
}

const apiLoadTags = makeApiLoadTags()

export default function Page(props: Props) {
  const deserialized = useMemo(() => {
    return {
      tags: PlainObject.deserializer(TagPaginator.create, props.tags),
      user: PlainObject.deserializer(User.create, props.user)
    }
  }, [props.tags, props.user])

  const [tags, setTags] = useState(deserialized.tags)

  const handleLoadTags: IndexTemplateProps['onLoadTags'] = async term => {
    const result = await apiLoadTags.exec({ search: term })
    if (result.isRight()) {
      setTags(result.value)
    }
  }

  return (
    <IndexTemplate
      tags={tags}
      user={deserialized.user}
      onLoadTags={handleLoadTags}
    />
  )
}

export const getServerSideProps = ssrAuth<Props, { id: string }>(
  async context => {
    const apiLoadTags = makeApiLoadTags(context.req.cookies)
    const apiAuthMe = makeApiAuthMe(context.req.cookies)

    const [meResult, tagsResult] = await Promise.all([
      apiAuthMe.exec(),
      apiLoadTags.exec({ limit: 100 })
    ])

    const tags = tagsResult.isRight() ? tagsResult.value : null
    const user = meResult.isRight() ? meResult.value : null

    return {
      props: {
        tags: PlainObject.serializer(tags),
        user: PlainObject.serializer(user)
      }
    }
  }
)
