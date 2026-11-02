import { createFileRoute } from '@tanstack/react-router'
import { CaseStudyPage, caseStudyHead } from '../components/case-study-page'
import { caseStudies } from '../data/case-studies'

const study = caseStudies['closeknit']

export const Route = createFileRoute('/work/closeknit')({
  head: () => caseStudyHead('/work/closeknit'),
  component: () => <CaseStudyPage study={study} />,
})
