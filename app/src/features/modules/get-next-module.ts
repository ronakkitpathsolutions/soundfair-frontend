import { ModuleId, ModulePartId } from '@/features/modules/modulesSlice'
import { modulesList } from '@/features/modules/content/modules-list'

export const getNextModulePart = (moduleId: ModuleId, partId: ModulePartId) => {
  let nextModuleId: ModuleId = moduleId
  let nextPartId: ModulePartId | null = null

  // Get current module index
  const currentModuleIndex =
    modulesList.findIndex((module) => module.id === moduleId) || 0

  // Get current module part index
  const currentModulePartIndex =
    modulesList[currentModuleIndex].parts.findIndex((p) => p.id === partId) || 0

  const lastPartInModule =
    currentModulePartIndex === modulesList[currentModuleIndex].parts.length - 1

  if (lastPartInModule) {
    // Get next part in next module
    const nextModule = modulesList[currentModuleIndex + 1]

    if (!nextModule) {
      return null
    }

    nextModuleId = modulesList[currentModuleIndex + 1].id
    nextPartId = modulesList[currentModuleIndex + 1].parts[0].id
  } else {
    // Get next part in current module
    nextPartId =
      modulesList[currentModuleIndex].parts[currentModulePartIndex + 1].id
  }

  return {
    moduleId: nextModuleId,
    partId: nextPartId,
    lastPartInModule,
  }
}
