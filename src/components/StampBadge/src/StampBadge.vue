<template>
    <div
            class="first-ring"
            v-bind="getBindValue"
            :class="getStampBadgeClass"
            :style="{ transform: `rotate(${rotate}deg)` }"
    >
        <div class="second-ring" :class="getStampBadgeClass">
            <div class="third-ring" :class="getStampBadgeClass">
                <div class="forth-ring" :class="getStampBadgeClass">
                    <div class="content-rectangle ellipsis" :class="getStampBadgeClass">
                        <span class="">{{ content }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        name: "StampBadge",
        inheritAttrs: false,
    });
</script>

<script lang="ts" setup>
    import { computed, unref ,useAttrs} from "vue";
    import { stampBadgeProps } from "./props";
    //import { useAttrs } from "/@/hooks/core/useAttrs";

    const props = defineProps(stampBadgeProps);
    // get component class
    const attrs = useAttrs({ excludeDefaultKeys: false });
    const getStampBadgeClass = computed(() => {
        const { color, size } = props;
        return [
            {
                [`stamp-badge-${color}`]: !!color,
                [`stamp-badge-${size}`]: !!size,
            },
        ];
    });

    // get inherit binding value
    const getBindValue = computed(() => ({ ...unref(attrs), ...props }));
</script>

<style lang="less" scoped>
  .first-ring {
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .second-ring {
    background: #fff;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .third-ring {
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .forth-ring {
    background: #fff;
    border-radius: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }

  .content-rectangle {
    background: #fff;
    font-weight: bold;
    text-align: center;
    position: absolute;
  }

  .ellipsis {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  // primary
  .stamp-badge-primary.first-ring {
    background: #1890ff;
  }
  .stamp-badge-primary.third-ring {
    background: #1890ff;
  }
  .stamp-badge-primary.content-rectangle {
    border: 1px solid #1890ff;
    color: #1890ff;
  }
  // success
  .stamp-badge-success.first-ring {
    background: #52c41a;
  }
  .stamp-badge-success.third-ring {
    background: #52c41a;
  }
  .stamp-badge-success.content-rectangle {
    border: 1px solid #52c41a;
    color: #52c41a;
  }
  // error
  .stamp-badge-error.first-ring {
    background: #ff4d4f;
  }
  .stamp-badge-error.third-ring {
    background: #ff4d4f;
  }
  .stamp-badge-error.content-rectangle {
    border: 1px solid #ff4d4f;
    color: #ff4d4f;
  }
  // warning
  .stamp-badge-warning.first-ring {
    background: #faad14;
  }
  .stamp-badge-warning.third-ring {
    background: #faad14;
  }
  .stamp-badge-warning.content-rectangle {
    border: 1px solid #faad14;
    color: #faad14;
  }
  // info
  .stamp-badge-info.first-ring {
    background: #ccc;
  }
  .stamp-badge-info.third-ring {
    background: #ccc;
  }
  .stamp-badge-info.content-rectangle {
    border: 1px solid #ccc;
    color: #ccc;
  }
  // large
  .stamp-badge-large.first-ring {
    width: 84px;
    height: 84px;
  }
  .stamp-badge-large.second-ring {
    width: 80px;
    height: 80px;
  }
  .stamp-badge-large.third-ring {
    width: 74px;
    height: 74px;
  }
  .stamp-badge-large.forth-ring {
    width: 64px;
    height: 64px;
  }
  .stamp-badge-large.content-rectangle {
    width: 90px;
    font-size: 1.2rem;
  }
  // middle
  .stamp-badge-middle.first-ring {
    width: 64px;
    height: 64px;
  }
  .stamp-badge-middle.second-ring {
    width: 60px;
    height: 60px;
  }
  .stamp-badge-middle.third-ring {
    width: 56px;
    height: 56px;
  }
  .stamp-badge-middle.forth-ring {
    width: 48px;
    height: 48px;
  }
  .stamp-badge-middle.content-rectangle {
    width: 70px;
    font-size: 1rem;
  }
  // small
  .stamp-badge-small.first-ring {
    width: 54px;
    height: 54px;
  }
  .stamp-badge-small.second-ring {
    width: 50px;
    height: 50px;
  }
  .stamp-badge-small.third-ring {
    width: 46px;
    height: 46px;
  }
  .stamp-badge-small.forth-ring {
    width: 38px;
    height: 38px;
  }
  .stamp-badge-small.content-rectangle {
    width: 60px;
    font-size: 0.8rem;
  }
</style>
