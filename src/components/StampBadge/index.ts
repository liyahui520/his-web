import { withInstall } from "/@/utils";
import type { ExtractPropTypes } from "vue";
import stampbadge from "./src/StampBadge.vue";
import { stampBadgeProps } from "./src/props";

export const StampBadge = withInstall(stampbadge);
export declare type ButtonProps = Partial<
    ExtractPropTypes<typeof stampBadgeProps>
>;
