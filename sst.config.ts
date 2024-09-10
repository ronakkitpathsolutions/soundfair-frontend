import { SSTConfig } from 'sst'
import { NextjsSite, StaticSite } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'uwa-me-program',
      region: 'ap-southeast-2',
    }
  },
  stacks(app) {
    // Frontend
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        path: 'app',
        customDomain: {
          domainName:
            stack.stage === 'prod'
              ? 'bluurb.me'
              : `www-${stack.stage}.uwa-02.1.today.design`,
          domainAlias: stack.stage === 'prod' ? 'www.bluurb.me' : undefined,
          hostedZone: stack.stage === 'prod' ? 'bluurb.me' : '1.today.design',
        },
      })

      stack.addOutputs({
        Url: site.customDomainUrl || site.url,
      })
    })

    // Storybook
    app.stack(function Storybook({ stack }) {
      const site = new StaticSite(stack, 'storybook', {
        path: 'ui',
        buildOutput: 'storybook-static',
        buildCommand: 'yarn build-storybook',
        customDomain: {
          domainName:
            stack.stage === 'prod'
              ? 'storybook.bluurb.me'
              : `storybook-${stack.stage}.uwa-02.1.today.design`,
          hostedZone: stack.stage === 'prod' ? 'bluurb.me' : '1.today.design',
        },
      })

      stack.addOutputs({
        Url: site.customDomainUrl || site.url,
      })
    })
  },
} satisfies SSTConfig
