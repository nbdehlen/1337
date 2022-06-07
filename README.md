# 1337 code test

## Description

Nextjs app with a sortable and filterable list of the people working at 1337.

## Code design

- **Generic/specific** - I like to write functions that are able to handle multiple use-cases. If I only have one current use-case I tend to start out writing specific code because I find that I often end needing to refactor it anyway.
- **Structure** - The only thing worth mentioning is the components folder:

  - I put small generic components in `atoms/`.
  - Larger generic components in `molecules/`. If you are familiar with atomic design you might recognize the folder names.
  - If a component is non-generic the file goes directly in `components/`.
  - If the component has specific sub-components, all related components go in a separate folder in `components/`.

## Packages

- `axios:` Better error handling than fetch and cleaner syntax in my opinion.
- `chakra-ui:` I took the opportunity to try it out as I've wanted to for a while but have been busy with other projects in React Native where Chakra-ui isn't an option. I haven't really landed on how I want to structure things like spacing and theming in Chakra-ui so there are som inconsistencies.
- `memory-cache:` I wanted to be able to cache the response from `https://api.1337co.de/v3/employees` as it doesn't have any type of pagination. I had a look at weekly downloads and GitHub issues before deciding on this package.
- `next:` My hypothesis is that this list of employees will be a part of the 1337 careers pages and that it would benefit from some SEO so I Wanted some shape of SSR/SSG/ISR. Plus it gives me a chance to play around with Nextjs :)
- `react:` I definitely don't need React for this size project but I enjoy writing React code and imagine that it comes out a lot more structured than it would with vanilla js.
- `react-infinite-scroll-component:` I went with infinite scroll over pagination as it is a more engaging way of delivering content. If not for learning purposes I don't see why I would re-invent the wheel and build this myself. Checked weekly downloads and GitHub issues before deciding on this package.

## User stories

- **Responsive:** Let's not limit ourselves to the 10-15% that are viewing this on a computer.
- **TypeScript:** I like TypeScript. It isn't perfect but it improves auto-complete, makes code easier to understand and reduces the amount of bugs.
- **Sorting/Filtering:** Testing is crucial but let's be honest... `Om katten själv får välja™` it will write features :)

## Instructions

- `npm i`
- `npm run build`
- `npm run dev`
- open the url `localhost:3000` in a browser
