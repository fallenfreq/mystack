<template>
  <!--
    overflow-hidden stops the darkmode switch from creating a horzontal scroll bar on the viewport
    I put it here instead of the darkmode switch because otherwise the focus highlight on the darkmode switch gets cut off
  -->
  <VaNavbar color="BackgroundPrimary" class="overflow-hidden rounded-lg border h-auto p-3 mb-3">
    <template #left>
      <RouterLink class="flex items-center" to="/" tabindex="0" style="cursor: pointer">
        <img alt="Vue logo" class="w-7 mr-1" src="@/assets/logo.svg" />
      </RouterLink>
      <VaNavbarItem class="sm:hidden block">
        <VaDropdown :stickToEdges="true" :closeOnContentClick="false">
          <template #anchor>
            <VaButton
              size="large"
              class="mr-3"
              text-color="TextPrimary"
              preset="secondary"
              icon="menu"
            >
            </VaButton>
          </template>

          <VaDropdownContent class="w-64">
            <template v-for="item in items" :key="item.title">
              <VaSidebarItem
                :active="route.path === item.to"
                v-if="!item.children && !item.outsideHamburger && (!item.visible || item.visible())"
                :to="item.command ? undefined : item.to"
                @click="item.command ? item.command() : undefined"
                @keydown.enter="item.command ? item.command() : undefined"
              >
                <VaSidebarItemContent>
                  <VaIcon :name="item.icon" />
                  <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                </VaSidebarItemContent>
              </VaSidebarItem>

              <VaAccordion v-else-if="!item.outsideHamburger && (!item.visible || item.visible())">
                <VaCollapse body-color="BackgroundElement">
                  <template #header="{ value: isCollapsed }">
                    <VaSidebarItem
                      :active="item.children?.some((child) => child.to === route.path)"
                    >
                      <VaSidebarItemContent>
                        <VaIcon :name="item.icon" />
                        <VaSidebarItemTitle>{{ item.title }}</VaSidebarItemTitle>
                        <VaSpacer />
                        <VaIcon :name="isCollapsed ? 'va-arrow-up' : 'va-arrow-down'" />
                      </VaSidebarItemContent>
                    </VaSidebarItem>
                  </template>
                  <template #body>
                    <template v-for="child in item.children">
                      <VaSidebarItem
                        :active="route.path === child.to"
                        v-if="!child.visible || child.visible()"
                        :key="child.title"
                        :to="child.command ? undefined : child.to"
                        @click="child.command ? child.command() : undefined"
                        @keydown.enter="child.command ? child.command() : undefined"
                      >
                        <VaSidebarItemContent>
                          <VaIcon :name="child.icon" />
                          <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                        </VaSidebarItemContent>
                      </VaSidebarItem>
                    </template>
                  </template>
                </VaCollapse>
              </VaAccordion>
            </template>
          </VaDropdownContent>
        </VaDropdown>
      </VaNavbarItem>
    </template>

    <template #right>
      <template v-for="item in items" :key="item.title">
        <VaNavbarItem
          :class="{ 'hidden sm:block': !item.outsideHamburger }"
          v-if="!item.visible || item.visible()"
        >
          <VaButton
            v-if="!item.children"
            :icon="!item.title ? item.icon : undefined"
            :to="item.command ? undefined : item.to"
            @click="item.command ? item.command() : undefined"
            @keydown.enter="item.command ? item.command() : undefined"
            size="large"
            :text-color="route.path === item.to ? 'Primary' : 'TextPrimary'"
            preset="secondary"
          >
            {{ item.title }}
          </VaButton>

          <VaDropdown v-else :stickToEdges="true">
            <template #anchor>
              <VaButton
                size="large"
                :text-color="
                  item.children?.some((child) => child.to === route.path)
                    ? 'Primary'
                    : 'TextPrimary'
                "
                preset="secondary"
                :icon="item.title ? undefined : item.icon"
                :icon-right="item.title ? 'va-arrow-down' : undefined"
                :opened-icon="item.title ? undefined : item.icon"
              >
                {{ item.title }}
              </VaButton>
            </template>

            <VaDropdownContent class="w-64">
              <template v-for="child in item.children" :key="child.title">
                <VaSidebarItem
                  :active="route.path === child.to"
                  v-if="!child.visible || child.visible()"
                  :to="child.command ? undefined : child.to"
                  @click="child.command ? child.command() : undefined"
                  @keydown.enter="child.command ? child.command() : undefined"
                >
                  <VaSidebarItemContent>
                    <VaIcon :name="child.icon" />
                    <VaSidebarItemTitle>{{ child.title }}</VaSidebarItemTitle>
                  </VaSidebarItemContent>
                </VaSidebarItem>
              </template>
            </VaDropdownContent>
          </VaDropdown>
        </VaNavbarItem>
      </template>
      <VaNavbarItem>
        <VuesticDarkModeSwitch />
      </VaNavbarItem>
    </template>
  </VaNavbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import zitadelAuth from '@/services/zitadelAuth'
import { useRoute } from 'vue-router'

interface MenuItem {
  title?: string
  icon?: string
  to?: string
  command?: () => any
  visible?: () => boolean
  children?: MenuItem[]
  outsideHamburger?: boolean
}

const route = useRoute()

const items = ref<MenuItem[]>([
  { title: 'Home', icon: 'home', to: '/' },
  { title: 'About', icon: 'info', to: '/about' },
  {
    title: 'Demos',
    icon: 'dashboard',
    children: [
      {
        title: 'Vuestic',
        icon: 'view_comfy',
        to: '/vuestic-demo'
      },
      {
        title: 'Primevue',
        icon: 'view_comfy',
        to: '/primevue-demo'
      }
    ]
  },
  {
    title: 'Login',
    icon: 'person',
    to: '/login',
    visible: () => !zitadelAuth.oidcAuth.isAuthenticated,
    outsideHamburger: true
  },

  {
    icon: 'account_circle',
    outsideHamburger: true,
    visible: () => zitadelAuth.oidcAuth.isAuthenticated,
    children: [
      {
        icon: 'account_circle',
        title: 'Profile',
        to: '/profile',
        visible: () => zitadelAuth.oidcAuth.isAuthenticated
      },
      {
        title: 'Admin',
        icon: 'settings',
        to: '/admin',
        visible: () => {
          return zitadelAuth.hasRole('admin')
        }
      },
      {
        title: 'Signout',
        icon: 'exit_to_app',
        command: () => zitadelAuth.oidcAuth.signOut(),
        visible: () => zitadelAuth.oidcAuth.isAuthenticated
      }
    ]
  }
])
</script>
