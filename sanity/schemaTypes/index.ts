import { type SchemaTypeDefinition } from 'sanity'
import { projects } from './project'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projects],
}
