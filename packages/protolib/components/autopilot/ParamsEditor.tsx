import { YStack, XStack, Label, Button, Input, ScrollView, Select } from '@my/ui'
import { Eye, Trash } from '@tamagui/lucide-icons'
import { useState, useEffect, useCallback } from 'react'
import { InteractiveIcon } from '../InteractiveIcon'
import { nanoid } from 'nanoid'
import { useUpdateEffect } from 'usehooks-ts'
import { SelectList } from '../SelectList'

export const ParamsEditor = ({
  params = {},
  setParams,
  configParams = {},
  setConfigParams = (x) => { },
  mode = 'action'
}) => {
  const [rows, setRows] = useState(() => {
    const allKeys = new Set([...Object.keys(params), ...Object.keys(configParams)])

    return Array.from(allKeys).map((key) => ({
      rowId: nanoid(),
      paramKey: key,
      description: params[key] ?? '',
      visible: configParams[key]?.visible ?? true,
      defaultValue: configParams[key]?.defaultValue ?? '',
      type: configParams[key]?.type ?? 'string',
    }))
  })

  useUpdateEffect(() => {
    const newParams = {}
    const newConfigParams = {}
    console.log("rows", rows)
    rows.forEach(({ paramKey, description, visible, defaultValue, type }) => {

      if (!paramKey.trim()) return

      newParams[paramKey] = description
      newConfigParams[paramKey] = { visible, defaultValue, type }
    })
    console.log("params", newParams)
    setParams(newParams)
    if (mode == 'action') {
      console.log("configParams", newConfigParams)
      setConfigParams(newConfigParams)
    }
  }, [rows])

  const handleAddParam = useCallback(() => {
    setRows((prev) => [
      ...prev,
      {
        rowId: nanoid(),
        paramKey: '',
        description: '',
        visible: true,
        defaultValue: '',
        type: 'string',
      },
    ])
  }, [])

  const handleRemoveParam = useCallback((rowIdToRemove) => {
    setRows((prev) => prev.filter((row) => row.rowId !== rowIdToRemove))
  }, [])

  const handleChangeParamKey = useCallback((rowId, newKey) => {
    setRows((prev) =>
      prev.map((row) =>
        row.rowId === rowId ? { ...row, paramKey: newKey } : row
      )
    )
  }, [])

  const handleChangeDescription = useCallback((rowId, newDescription) => {
    setRows((prev) =>
      prev.map((row) =>
        row.rowId === rowId ? { ...row, description: newDescription } : row
      )
    )
  }, [])


  const handleChangeDefaultValue = useCallback((rowId, newValue) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.rowId !== rowId) return row
        return { ...row, defaultValue: newValue }
      })
    )
  }, [])

  const handleToggleVisible = useCallback((rowId) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.rowId !== rowId) return row
        return { ...row, visible: !row.visible }
      })
    )
  }, [])

  const handleChangeType = useCallback((rowId, newType) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.rowId !== rowId) return row
        return { ...row, type: newType }
      })
    )
  }, [])

  const types = ["string", "number", "boolean", "json", "array", "card", "text"]

  return (
    <YStack flex={1} height="100%" borderRadius="$3" p="$3" backgroundColor="$gray3" overflow="hidden" >
      <XStack alignItems="center" justifyContent="space-between">
        <Label size="$4">Parameters</Label>
        <Button onPress={handleAddParam}>Add param</Button>
      </XStack>

      <ScrollView mt="$3" flex={1}>
        {rows.map(({ rowId, paramKey, description, visible, defaultValue, type }) => (
          <XStack key={rowId} space="$2" alignItems="center" padding="$2" borderRadius="$2" >
            {mode == 'action' && <InteractiveIcon Icon={Eye} IconColor={visible ? 'var(--color10)' : 'var(--gray9)'} onPress={() => handleToggleVisible(rowId)} />}

            <Input placeholder={mode == 'action' ? "Param Key" : "name"} flex={1} value={paramKey} onChange={(e) => handleChangeParamKey(rowId, e.target.value)} />

            <Input placeholder={mode == 'action' ? "Description" : "value"} flex={2} value={description} onChange={(e) => handleChangeDescription(rowId, e.target.value)} />
            <XStack width="150px">
              <SelectList title="Select type" elements={types} value={type ?? "string"} setValue={(value) => handleChangeType(rowId, value)} />
            </XStack>
            {mode == 'action' && <Input placeholder="Default Value" flex={4} value={defaultValue} onChange={(e) => handleChangeDefaultValue(rowId, e.target.value)} />}

            <InteractiveIcon Icon={Trash} IconColor="var(--red10)" onPress={() => handleRemoveParam(rowId)} />
          </XStack>
        ))}
      </ScrollView>
    </YStack>
  )
}
