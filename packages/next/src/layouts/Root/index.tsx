import type { SanitizedConfig } from 'payload/types'

import { translations } from '@payloadcms/translations/client'
import { RootProvider, buildComponentMap } from '@payloadcms/ui'
import '@payloadcms/ui/scss/app.scss'
import { cookies, headers } from 'next/headers'
import { deepMerge } from 'payload/utilities'
import React from 'react'

import { createClientConfig } from '../../utilities/createClientConfig'
import { getRequestLanguage } from '../../utilities/getRequestLanguage'

export const metadata = {
  description: 'Generated by Next.js',
  title: 'Next.js',
}

const rtlLanguages = ['ar', 'fa', 'ha', 'ku', 'ur', 'ps', 'dv', 'ks', 'khw', 'he', 'yi']

export const RootLayout = async ({
  children,
  config: configPromise,
}: {
  children: React.ReactNode
  config: Promise<SanitizedConfig>
}) => {
  const config = await configPromise
  const clientConfig = await createClientConfig(config)

  const lang =
    getRequestLanguage({
      cookies: cookies(),
      headers: headers(),
    }) ?? clientConfig.i18n.fallbackLanguage

  const dir = rtlLanguages.includes(lang) ? 'RTL' : 'LTR'

  const mergedTranslations = deepMerge(translations, clientConfig.i18n.translations)

  const languageOptions = Object.entries(translations || {}).map(([language, translations]) => ({
    label: translations.general.thisLanguage,
    value: language,
  }))

  const componentMap = buildComponentMap({ config })

  return (
    <html dir={dir} lang={lang}>
      <body>
        <RootProvider
          componentMap={componentMap}
          config={clientConfig}
          fallbackLang={clientConfig.i18n.fallbackLanguage}
          lang={lang}
          languageOptions={languageOptions}
          translations={mergedTranslations[lang]}
        >
          {children}
        </RootProvider>
        <div id="portal" />
      </body>
    </html>
  )
}
