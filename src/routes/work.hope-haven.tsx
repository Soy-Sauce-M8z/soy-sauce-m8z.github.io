import { createFileRoute } from '@tanstack/react-router'
import { CaseStudyPage, caseStudyHead } from '../components/case-study-page'
import { caseStudies } from '../data/case-studies'

const study = caseStudies['hope-haven']

export const Route = createFileRoute('/work/hope-haven')({
  head: () => caseStudyHead('/work/hope-haven'),
  component: () => <CaseStudyPage study={study} />,
})
