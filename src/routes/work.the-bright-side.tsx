import { createFileRoute } from '@tanstack/react-router'
import { CaseStudyPage, caseStudyHead } from '../components/case-study-page'
import { caseStudies } from '../data/case-studies'

const study = caseStudies['the-bright-side']

export const Route = createFileRoute('/work/the-bright-side')({
  head: () => caseStudyHead('/work/the-bright-side'),
  component: () => <CaseStudyPage study={study} />,
})
