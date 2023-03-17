/* eslint-disable react/display-name */
import { LazyExoticComponent, Suspense } from "react"
import Loader from "components/shared/Loader"

const Loadable =
  (Component: LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<Loader />}>
        <Component {...props} />
      </Suspense>
    )

export default Loadable
