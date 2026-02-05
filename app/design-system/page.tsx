import { PageWrapper } from "@/components/layout/PageWrapper";
import {
  Body1,
  Body2,
  Caption,
  Headline,
  HeadlineXL,
  Label,
  Subheading1,
  Subheading2,
} from "@/components/typography";
import { Button } from "@/components/ui/button";
import Swatch from "./components/Swatch";

export default function Page() {
  return (
    <PageWrapper>
      <main className="ds-container">
        <Headline className="mb-6">Design system</Headline>
        <section className="mb-8">
          <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
            Colors
          </Subheading2>
          <div className="max-w-3xl">
            <div className="mb-6">
              <Body1 className="mb-3 font-bold">Primary</Body1>
              <div className="flex gap-4 flex-wrap">
                <Swatch colorVar="--brand-50" value="#EDECFE" />
                <Swatch colorVar="--brand-200" value="#B9B4FA" />
                <Swatch colorVar="--brand-300" value="#958BF8" />
                <Swatch colorVar="--brand-400" value="#7364F4" />
                <Swatch colorVar="--brand-500" value="#5235EF" />
                <Swatch colorVar="--brand-600" value="#3F1CD4" />
                <Swatch colorVar="--brand-700" value="#2F13A5" />
                <Swatch colorVar="--brand-800" value="#220C7E" />
                <Swatch colorVar="--brand-900" value="#0B033B" />
              </div>
            </div>
            <div className="mb-6">
              <Body1 className="mb-3 font-bold">Secondary</Body1>
              <div className="flex gap-4 flex-wrap">
                <Swatch colorVar="--gray-50" value="#E2E2E3" />
                <Swatch colorVar="--gray-100" value="#C9C9CA" />
                <Swatch colorVar="--gray-200" value="#969698" />
                <Swatch colorVar="--gray-300" value="#656568" />
                <Swatch colorVar="--gray-400" value="#39393B" />
                <Swatch colorVar="--gray-500" value="#101011" />
                <Swatch colorVar="--gray-600" value="#0E0E0F" />
                <Swatch colorVar="--gray-700" value="#0B0B0C" />
                <Swatch colorVar="--gray-800" value="#070708" />
                <Swatch colorVar="--gray-900" value="#000000" />
              </div>
            </div>
          </div>
        </section>
        <section>
          <Subheading2 className="mb-3 pb-3 border-b-2 border-neutral-400">
            Typography
          </Subheading2>
          <div className="max-w-3xl flex flex-col gap-4">
            <HeadlineXL>Headline XL</HeadlineXL>
            <Headline>Headline</Headline>
            <Subheading1>Subheading 1</Subheading1>
            <Subheading2>Subheading 2</Subheading2>
            <Body1>
              Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body1>
            <Body2>
              Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </Body2>
            <Caption>Caption - Lorem ipsum dolor sit amet.</Caption>
            <Label>Label - Lorem ipsum dolor sit amet.</Label>
          </div>
        </section>
        <section>
          <Subheading2 className="mt-8 mb-3 pb-3 border-b-2 border-neutral-400">
            Components
          </Subheading2>
          <Body1 className="mb-3 font-bold">Buttons</Body1>
          <div className="flex gap-4 flex-wrap mb-3">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
            <Button disabled>Disabled Button</Button>
            <Button variant={"destructive"}>Destructive Button</Button>
            <Button size={"sm"}>Small Button</Button>
            <Button size={"lg"}>Large Button</Button>
          </div>
        </section>
      </main>
    </PageWrapper>
  );
}
